import {IReactComponent} from "./observer";
import * as React from "react";
import {MobXProviderContext} from "./Provider";

export const inject =
  (...storeNames: Array<any>) =>
  (component: IReactComponent) => {
    const Injector = (props) => {
      const context = React.useContext(MobXProviderContext);
      const newProps = {
        ...props,
        ...context,
      };
      return React.createElement(component, newProps);
    };

    return Injector;
  };
