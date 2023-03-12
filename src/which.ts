import {
  makeAutoObservable,
  makeObservable,
  observable,
  action,
  computed,
  Reaction,
  AnnotationsMap,
} from "mobx";

// import {observer, Observer, useLocalObservable} from "mobx-react-lite";
// import {observer, Observer, useLocalObservable} from "./nut-mobx-react-lite";

// import {
//   observer,
//   Observer,
//   useLocalObservable,
//   MobXProviderContext,
//   Provider,
//   inject,
// } from "mobx-react";
import {
  observer,
  Observer,
  useLocalObservable,
  MobXProviderContext,
  Provider,
  inject,
} from "./nut-mobx-react";

export type {AnnotationsMap};

export {
  // todo mobx
  makeAutoObservable,
  makeObservable,
  observable,
  action,
  computed,
  Reaction,

  // mobx-react-lite
  observer,
  Observer,
  useLocalObservable,

  // mobx-react
  MobXProviderContext,
  Provider,
  inject,
};
