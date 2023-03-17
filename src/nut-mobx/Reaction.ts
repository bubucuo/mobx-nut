export interface IDerivation {}

export class Reaction implements IDerivation {
  track(fn: () => void) {
    fn();
  }
}
