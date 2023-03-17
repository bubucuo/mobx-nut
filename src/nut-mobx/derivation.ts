import {globalState} from "./globalstate";
import {IDerivation, IDerivationState_} from "./Reaction";
import {removeObserver, addObserver} from "./observable-core";

export function trackDerivedFunction(derivation: IDerivation, fn: () => void) {
  derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;

  derivation.newObserving_ = new Array(
    (derivation.observing_?.length || 0) + 100
  );

  derivation.unboundDepsCount_ = 0;

  const prev = globalState.trackingDerivation;
  globalState.trackingDerivation = derivation;

  fn();

  globalState.trackingDerivation = prev;

  bindDependencies(derivation);
}

//
function bindDependencies(derivation: IDerivation) {
  const prev = derivation.observing_;
  const observing = (derivation.observing_ = derivation.newObserving_!);

  let i0 = 0,
    len = derivation.unboundDepsCount_;

  for (let i = 0; i < len; i++) {
    // 可观察变量
    const dep = observing[i];
    if (dep.diffValue_ === 0) {
      dep.diffValue_ = 1;
      // derivation 的新老可观察变量个数不同
      if (i0 !== i) {
        observing[i0] = dep;
      }
      i0++;
    }
  }

  observing.length = i0;
  derivation.newObserving_ = null;

  len = prev?.length;

  while (len--) {
    const dep = prev[len];
    if (dep.diffValue_ === 0) {
      removeObserver(dep, derivation);
    }
    dep.diffValue_ = 0;
  }

  while (i0--) {
    const dep = observing[i0];
    if (dep.diffValue_ === 1) {
      dep.diffValue_ = 0;
      addObserver(dep, derivation);
    }
  }
}
