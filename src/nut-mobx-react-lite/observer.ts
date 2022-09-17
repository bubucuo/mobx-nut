import React, {memo} from "react";
import {useObserver} from "./useObserver";

export function observer<P>(baseComponent: React.FunctionComponent<P>) {
  const baseComponentName = baseComponent.displayName || baseComponent.name;
  let observerComponent = (props: any) => {
    return useObserver(() => baseComponent(props), baseComponentName);
  };

  observerComponent = memo(observerComponent);
  return observerComponent;
}
