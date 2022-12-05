import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../src/pages/App/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
