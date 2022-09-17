import {useState, useEffect} from "react";
import Timer from "../store/Timer";
import {observer, observable, useLocalObservable} from "../which";

function TimerPage() {
  const [offset, setOffset] = useState(100);
  return (
    <div>
      <h1>TimerPage</h1>

      <button onClick={() => setOffset(offset + 100)}>{offset}</button>

      <TimerView offset={offset} />
    </div>
  );
}

// 定时器
const TimerView = observer(({offset}: {offset: number}) => {
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
    offset,
    secondsPassed: 0,
    increaseTimer() {
      this.secondsPassed++;
    },
    resetOffset(_offset: number) {
      this.offset = _offset;
    },
    get offsetTime() {
      return this.secondsPassed - this.offset;
    },
  }));

  useEffect(() => {
    timer.resetOffset(offset);
  }, [offset]);

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
      <p>{timer.offsetTime}</p>
    </div>
  );
});

export default TimerPage;
