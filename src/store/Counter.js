import {makeAutoObservable} from "mobx";
import {createContext} from "react";
import {useContext} from "react";
import CountContext from "./context";

class Counter {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setCount = () => {
    this.count++;
    console.log(
      "%c [ this.count ]-15",
      "font-size:13px; background:pink; color:#bf2c9f;",
      this.count
    );
  };
}

const counter = new Counter();
// const useStore = () => useContext(createContext(counter));

const useStore = () => {
  const store = useContext(CountContext);

  return store;
};

export {counter, useStore};
