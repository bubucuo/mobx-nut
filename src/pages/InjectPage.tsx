import {Component} from "react";
import {Provider, inject, observer} from "../which";

export default class InjectPage extends Component {
  render() {
    return (
      <div>
        <h3>InjectPage</h3>

        <Provider foo="bar">
          <Child />
        </Provider>
      </div>
    );
  }
}

const Child = inject("foo")(
  observer(function InjectPage(props) {
    return (
      <div>
        context:
        {props.foo}
      </div>
    );
  })
);
