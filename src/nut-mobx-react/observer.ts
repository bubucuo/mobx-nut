import React, {Component} from "react";
import {observer as observerLite} from "../nut-mobx-react-lite";
import {Reaction} from "../which";

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
    return makeClassComponentObserver(
      component as React.ComponentClass<any, any>
    ) as T;
  } else {
    return observerLite(component as React.FunctionComponent<any>) as T;
  }
}

function makeClassComponentObserver(
  componentClass: React.ComponentClass<any, any>
): React.ComponentClass<any, any> {
  const target = componentClass.prototype;
  const originalRender = target.render;

  target.render = createReactiveRender.call(this, originalRender);
  return componentClass;
}

function createReactiveRender(originalRender: Function) {
  let isRenderingPending = false;

  function reactiveRender() {
    isRenderingPending = false;

    const reaction = new Reaction(`render`, () => {
      if (!isRenderingPending) {
        isRenderingPending = true;
        Component.prototype.forceUpdate.call(this);
      }
    });

    let rendering = undefined;
    reaction.track(() => {
      rendering = originalRender();
    });

    return rendering;
  }

  return reactiveRender;
}
