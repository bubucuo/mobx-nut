import {observer} from "mobx-react-lite";
import "./App.css";
import CountContext from "./store/context";
import {counter, useStore} from "./store/Counter";

function A(props) {
  const store = useStore();

  return (
    <div>
      <p>A组件</p>
      <B />
    </div>
  );
}

const B = observer(() => {
  const store = useStore();
  console.log(
    "%c [ store ]-19",
    "font-size:13px; background:pink; color:#bf2c9f;",
    store
  );

  return (
    <div>
      <p>B组件</p>

      <button onClick={store.setCount}>{store.count}</button>
    </div>
  );
});

function App() {
  return (
    <div className="App">
      <CountContext.Provider value={counter}>
        <h1>App</h1>

        <A />
      </CountContext.Provider>
    </div>
  );
}

export default App;
