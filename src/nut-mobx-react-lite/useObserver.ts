import React, {useRef, useEffect} from "react";
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
  const [, setState] = React.useState();
  const forceUpdate = () => setState([] as any);

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

  useEffect(() => {
    return () => {
      reactionTrackingRef.current?.reaction.dispose();
      reactionTrackingRef.current = null;
    };
  }, []);

  const {reaction} = reactionTrackingRef.current!;

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
