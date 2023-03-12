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
import ProviderPage from "./pages/ProviderPage";
import InjectPage from "./pages/InjectPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="count" element={<CountPage />} />
            <Route path="todoList" element={<TodoListPage />} />
            <Route path="timer" element={<TimerPage />} />
            <Route path="providerPage" element={<ProviderPage />} />
            <Route path="injectPage" element={<InjectPage />} />
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
      <Link to="/providerPage">providerPage</Link>
      <Link to="/injectPage">injectPage</Link>

      <Outlet />
    </div>
  );
}

export default App;
