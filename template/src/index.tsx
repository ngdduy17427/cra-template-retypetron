import ReactDomClient from "react-dom/client";
import App from "./app";
import "./css/global.scss";

const container = document.getElementById("root") as Element;
const root = ReactDomClient.createRoot(container);

root.render(<App />);
