import {useState, useEffect} from "react";
import Timer from "../store/Timer";
import {observer, observable, useLocalObservable} from "../which";

function TimerPage() {
  return (
    <div>
      <h1>TimerPage</h1>

      <TimerView />
    </div>
  );
}

// 定时器
const TimerView = observer(() => {
  // const [timer] = useState(() => new Timer());

  // const [timer] = useState(() =>
  //   observable({
  //     secondsPassed: 0,
  //     increaseTimer() {
  //       this.secondsPassed++;
  //     },
  //   })
  // );

  const timer = useLocalObservable(() => ({
    secondsPassed: 0,
    increaseTimer() {
      this.secondsPassed++;
    },
  }));

  useEffect(() => {
    const handle = setInterval(() => {
      timer.increaseTimer();
    }, 1000);

    return () => {
      clearInterval(handle);
    };
  }, [timer]);

  return (
    <div>
      <h3>TimerView</h3>
      <p>seconds passed: {timer.secondsPassed} s</p>
    </div>
  );
});

export default TimerPage;
