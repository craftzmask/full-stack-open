import ReactDOM from "react-dom/client";
import App from "./App";

import "./main.css";
import { NotificationContextProvider } from "./reducers/NotificationReducer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
);
