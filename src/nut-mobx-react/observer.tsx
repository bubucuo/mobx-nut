import React, {memo} from "react";
import {observer as observerLite} from "./";

export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

// HOC
export function observer<T extends IReactComponent>(component: T): T {
  if (
    Object.prototype.isPrototypeOf.call(React.Component, component) ||
    Object.prototype.isPrototypeOf.call(React.PureComponent, component)
  ) {
    // Class component
    return makeClassComponentObserver(
      component as React.ComponentClass<any, any>
    ) as T;
  } else {
    // Function component
    return observerLite(component as React.FunctionComponent<any>) as T;
  }
}

export function makeClassComponentObserver(
  componentClass: React.ComponentClass<any, any>
): React.Component<any, any> {
  const target = componentClass.prototype;

  return componentClass;
}
