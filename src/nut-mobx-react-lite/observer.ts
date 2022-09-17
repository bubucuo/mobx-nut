import React, {memo} from "react";
import {useObserver} from "./useObserver";

export function observer<P extends object, TRef = {}>(
  baseComponent:
    | React.ForwardRefRenderFunction<TRef, P>
    | React.FunctionComponent<P>
    | React.ForwardRefExoticComponent<
        React.PropsWithoutRef<P> & React.RefAttributes<TRef>
      >
) {
  const baseComponentName = baseComponent.displayName || baseComponent.name;

  let observerComponent = (props: any, ref: React.Ref<TRef>) => {
    return useObserver(() => baseComponent(props, ref), baseComponentName);
  };

  observerComponent = memo(observerComponent);

  if (baseComponentName !== "") {
    (observerComponent as React.FunctionComponent).displayName =
      baseComponentName;
  }

  return observerComponent;
}
