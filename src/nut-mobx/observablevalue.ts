import {propagateChanged, reportObserved} from "./observable-core";
import {IDerivation, IDerivationState_} from "./Reaction";

export const $mobx = Symbol("mobx administration");

export interface IDepTreeNode {
  name_: string;
  observing_?: IObservable[];
}

export interface IObservable {
  diffValue_: number;

  lastAccessedBy_: number;

  isBeingObserved_: boolean;

  lowestObserverState_: IDerivationState_;

  observers_: Set<IDerivation>;
}

export interface IAtom extends IObservable {
  reportObserved(): boolean;
  reportChanged(): void;
}

export class Atom implements IAtom {
  diffValue_ = 0;

  isBeingObserved_ = false;
  observers_ = new Set<IDerivation>();

  lastAccessedBy_ = 0;
  lowestObserverState_ = IDerivationState_.NOT_TRACKING_;

  public reportObserved(): boolean {
    return reportObserved(this);
  }

  public reportChanged() {
    propagateChanged(this);
  }
}

export class ObservableValue extends Atom {
  value_;

  constructor(value: any) {
    super();
    this.value_ = value;
  }

  setNewValue_(newValue: any) {
    this.value_ = newValue;
    this.reportChanged();
  }

  public get() {
    this.reportObserved();
    return this.value_;
  }
}
