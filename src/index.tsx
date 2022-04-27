import "bulmaswatch/superhero/bulmaswatch.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
// import CodeCell from "./components/code-cell";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux";
import CellList from "./components/cell-list";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

// this is how we render in react 18. replaced reactdom.render()
const container = document.querySelector("#root");
if (!container) throw new Error("failed to find root element"); // so tsc knows container won't be null
const root = ReactDOM.createRoot(container);
root.render(<App />);
