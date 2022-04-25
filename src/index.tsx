import "bulmaswatch/superhero/bulmaswatch.min.css";
// import CodeCell from "./components/code-cell";
import ReactDOM from "react-dom/client";
import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

// this is how we render in react 18. replaced reactdom.render()
const container = document.querySelector("#root");
if (!container) throw new Error("failed to find root element"); // so tsc knows container won't be null
const root = ReactDOM.createRoot(container);
root.render(<App />);
