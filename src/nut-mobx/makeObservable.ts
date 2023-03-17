import {AnnotationsMap} from "mobx";
import {$mobx, ObservableValue} from "./observablevalue";
import {addHiddenProp, isPlainObject, ownKeys} from "./utils";
import {Annotation, createAutoAnnotation} from "./annotation";

type NoInfer<T> = [T][T extends any ? 0 : never];
export function makeObservable<
  T extends object,
  AdditionalKeys extends PropertyKey = never
>(target: any, annotations?: AnnotationsMap<T, NoInfer<AdditionalKeys>>) {
  const adm: ObservableObjectAdministration = asObservableObject(target)[$mobx];

  ownKeys(annotations).forEach((key) => adm.make_(key, annotations![key]));

  return target;
}

export function asObservableObject(target: any) {
  const adm = new ObservableObjectAdministration(target);

  // 把 adm 添加到target上，且不可枚举
  addHiddenProp(target, $mobx, adm);
  return target;
}

export class ObservableObjectAdministration {
  isPlainObject_: boolean;
  constructor(public target_: any, public values_ = new Map()) {
    this.isPlainObject_ = isPlainObject(this.target_);
  }

  make_(key: PropertyKey, annotation: Annotation | boolean) {
    if (annotation === true) {
      annotation = createAutoAnnotation();
    }
    let source = this.target_;

    while (source && source !== Object.prototype) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      if (descriptor) {
        annotation.make_(this, key, descriptor);
      }

      source = Object.getPrototypeOf(source);
    }
  }

  // 可观察变量，new ObservableValue
  defineObservableProperty_(key: PropertyKey, value: any) {
    // 1. 定义拦截可观察变量
    const cachedObservablePropDescriptor =
      getCachedObservablePropDescriptor(key);

    const descriptor = {
      configurable: this.isPlainObject_,
      enumerable: true,
      get: cachedObservablePropDescriptor.get,
      set: cachedObservablePropDescriptor.set,
    };

    Object.defineProperty(this.target_, key, descriptor);

    // 2. new ObservableValue
    const observable = new ObservableValue(value);
    // Map
    this.values_.set(key, observable);
  }

  // 普通属性
  defineProperty_(key: PropertyKey, descriptor: PropertyDecorator) {
    Object.defineProperty(this.target_, key, descriptor);
    return true;
  }

  getObservablePropValue_(key: PropertyKey) {
    return this.values_.get(key)!.get();
  }

  // 具体的拦截
  setObservablePropValue_(key: PropertyKey, newValue: any) {
    const observable: ObservableValue = this.values_.get(key);

    observable.setNewValue_(newValue);
    return true;
  }
}

const keysSymbol = Symbol("mobx-keys");
export function makeAutoObservable(target: any) {
  const adm: ObservableObjectAdministration = asObservableObject(target)[$mobx];

  if (!target[keysSymbol]) {
    const proto = Object.getPrototypeOf(target);
    const keys = new Set([...ownKeys(target), ...ownKeys(proto)]);
    keys.delete("constructor");
    keys.delete($mobx);
    addHiddenProp(proto, keysSymbol, keys);
  }

  target[keysSymbol].forEach((key: string) => adm.make_(key, true));

  return adm;
}

const descriptorCache = Object.create(null);

function getCachedObservablePropDescriptor(key: PropertyKey) {
  return (descriptorCache[key] = {
    get() {
      return this[$mobx].getObservablePropValue_(key);
    },
    set(value: any) {
      return this[$mobx].setObservablePropValue_(key, value);
    },
  });
}
