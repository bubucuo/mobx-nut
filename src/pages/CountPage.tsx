import {Component} from "react";
import count from "../store/Count";
import {observer} from "../which";

function CountPage() {
  return (
    <div>
      <h1>CountPage</h1>
      <button onClick={count.add}>{count.num}</button>
    </div>
  );
}

// class CountPage extends Component {
//   render() {
//     return (
//       <div>
//         <h3>CountPage</h3>

//         <button onClick={count.add}>{count.num}</button>
//       </div>
//     );
//   }
// }

export default observer(CountPage);
