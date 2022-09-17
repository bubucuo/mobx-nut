import React from "react";
import {useObserver} from "./useObserver";

interface IObserverProps {
  children?(): React.ReactElement | null;
  render?(): React.ReactElement | null;
}

function ObserverComponent({children, render}: IObserverProps) {
  const component = children || render;

  if (typeof component !== "function") {
    return null;
  }

  return useObserver(component);
}

ObserverComponent.displayName = "Observer";

export {ObserverComponent as Observer};
