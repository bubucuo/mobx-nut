import {Component} from "react";
import count from "../store/Count";
import {observer, Observer} from "../which";

function CountPage() {
  return (
    <div>
      <h1>CountPage</h1>

      <Observer>
        {() => <button onClick={count.add}>{count.num}</button>}
      </Observer>
    </div>
  );
}

// class CountPage extends Component {
//   render() {
//     return (
//       <div>
//         <h1>CountPage</h1>

//         <button onClick={count.add}>{count.num}</button>
//       </div>
//     );
//   }
// }

export default observer(CountPage);
