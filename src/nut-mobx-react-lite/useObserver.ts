import {useRef, useState} from "react";
import {Reaction} from "../which";

export interface IReactionTracking {
  reaction: Reaction;
}

function observerComponentNameFor(baseComponentName: string) {
  return `observer${baseComponentName}`;
}

export function useObserver<T>(
  fn: () => T,
  baseComponentName: string = "observed"
): T {
  const [, setState] = useState();
  const forceUpdate = () => setState([] as any);

  // 可观察的值变化之后，组件要更新
  const reactionTrackingRef = useRef<IReactionTracking | null>(null);

  if (!reactionTrackingRef.current) {
    reactionTrackingRef.current = {
      reaction: new Reaction(
        observerComponentNameFor(baseComponentName),
        () => {
          forceUpdate();
        }
      ),
    };
  }

  const {reaction} = reactionTrackingRef.current;

  let rendering!: T;
  let exception;

  reaction.track(() => {
    try {
      rendering = fn();
    } catch (error) {
      exception = error;
    }
  });

  return rendering;
}
