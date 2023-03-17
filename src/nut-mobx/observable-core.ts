import {globalState} from "./globalstate";
import {IObservable} from "./observablevalue";
import {IDerivation} from "./Reaction";

// 根据可观察变量添加衍生
// observable Reaction
export function addObserver(observable: IObservable, node: IDerivation) {
  observable.observers_.add(node);
}

export function removeObserver(observable: IObservable, node: IDerivation) {
  observable.observers_.delete(node);
}

export function propagateChanged(observable: IObservable) {
  observable.observers_.forEach((d) => {
    d.onBecomeStale_();
  });
}

export function reportObserved(observable: IObservable) {
  const derivation = globalState.trackingDerivation;
  if (derivation) {
    derivation.newObserving_![derivation.unboundDepsCount_++] = observable;
    observable.isBeingObserved_ = true;

    return true;
  }

  return false;
}
