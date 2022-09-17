import React from "react";
import {act, cleanup, fireEvent, render} from "@testing-library/react";
import {observer} from "../index";
import {useObserver} from "../useObserver";

let consoleWarnMock: jest.SpyInstance | undefined;

afterEach(cleanup);
afterEach(() => {
  consoleWarnMock?.mockRestore();
});

function runTestSuite(mode: "observer" | "useObserver") {
  function obsComponent<P extends object>(
    component: React.FunctionComponent<P>,
    forceMemo = false
  ) {
    if (mode === "observer") {
      return observer(component);
    } else {
      const c = (props: P) => {
        consoleWarnMock = jest
          .spyOn(console, "warn")
          .mockImplementation(() => {});
        return useObserver(() => {
          return component(props);
        });
      };
      return forceMemo ? React.memo(c) : c;
    }
  }
}

runTestSuite("observer");
runTestSuite("useObserver");

it("should have the correct displayName", () => {
  const TestComponent = observer(function MyComponent() {
    return null;
  });
  expect((TestComponent as any).displayName).toBe("MyComponent");
});
