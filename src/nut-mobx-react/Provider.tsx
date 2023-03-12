import React, {useContext, useRef} from "react";

export type IValueMap = Record<string, any>;

export const MobXProviderContext = React.createContext<IValueMap>({});

export interface ProviderProps extends IValueMap {
  children: React.ReactNode;
}

export function Provider(props: ProviderProps) {
  const {children, ...store} = props;

  const parentValue = useContext(MobXProviderContext);

  const mutableProviderRef = useRef({...parentValue, ...store});
  const value = mutableProviderRef.current;

  return (
    <MobXProviderContext.Provider value={value}>
      {children}
    </MobXProviderContext.Provider>
  );
}
