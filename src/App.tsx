import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import CountPage from "./pages/CountPage";
import TimerPage from "./pages/TimerPage";
import TodoListPage from "./pages/TodoListPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="count" element={<CountPage />} />
            <Route path="todoList" element={<TodoListPage />} />
            <Route path="timer" element={<TimerPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout() {
  return (
    <div className="border">
      <Link to="/count">count</Link>
      <Link to="/todoList">todoList</Link>
      <Link to="/timer">timer</Link>

      <Outlet />
    </div>
  );
}

export default App;
