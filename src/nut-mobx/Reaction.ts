import {trackDerivedFunction} from "./derivation";
import {globalState} from "./globalstate";
import {IDepTreeNode, IObservable} from "./observablevalue";

export enum IDerivationState_ {
  // before being run or (outside batch and not being observed)
  // at this point derivation is not holding any data about dependency tree
  NOT_TRACKING_ = -1,
  // no shallow dependency changed since last computation
  // won't recalculate derivation
  // this is what makes mobx fast
  UP_TO_DATE_ = 0,
  // some deep dependency changed, but don't know if shallow dependency changed
  // will require to check first if UP_TO_DATE or POSSIBLY_STALE
  // currently only ComputedValue will propagate POSSIBLY_STALE
  //
  // having this state is second big optimization:
  // don't have to recompute on every dependency change, but only when it's needed
  POSSIBLY_STALE_ = 1,
  // A shallow dependency has changed since last computation and the derivation
  // will need to recompute when it's needed next.
  STALE_ = 2,
}

export interface IDerivation extends IDepTreeNode {
  observing_: IObservable[];
  newObserving_: null | IObservable[];
  dependenciesState_: IDerivationState_;
  /**
   * Id of the current run of a derivation. Each time the derivation is tracked
   * this number is increased by one. This number is globally unique
   */
  // runId_: number;
  /**
   * amount of dependencies used by the derivation in this run, which has not been bound yet.
   */
  unboundDepsCount_: number;
  onBecomeStale_(): void;
}

// todo
export class Reaction implements IDerivation {
  observing_: IObservable[] = [];
  newObserving_: IObservable[] = [];
  dependenciesState_ = IDerivationState_.NOT_TRACKING_;
  unboundDepsCount_ = 0;

  constructor(public name_ = "Reaction", private onInvalidate: () => void) {}
  track(fn: () => void) {
    const prev = globalState.trackingContext;
    globalState.trackingContext = this;

    trackDerivedFunction(this, fn);

    globalState.trackingContext = prev;
  }

  runReaction_() {
    const prev = globalState.trackingContext;
    globalState.trackingContext = this;

    this.onInvalidate();

    globalState.trackingContext = prev;
  }

  onBecomeStale_() {
    globalState.pendingReactions.push(this);
    runReactions();
  }
}

function runReactions() {
  const allReactions = globalState.pendingReactions;

  if (allReactions.length > 0) {
    let remainReactions = allReactions.splice(0);

    for (let i = 0, len = remainReactions.length; i < len; i++) {
      remainReactions[i].runReaction_();
    }
  }
}
