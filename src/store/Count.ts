import {makeAutoObservable, makeObservable, observable, action} from "../which";

// 注解
class Count {
  num = 0;

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      num: observable,
      add: action,
    });
  }
  add = () => {
    this.num++;
  };
}

const count = new Count();

export default count;
