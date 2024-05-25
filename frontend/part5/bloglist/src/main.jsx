import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"

import "./main.css";
import { NotificationContextProvider } from "./reducers/NotificationReducer";
import { UserContextProvider } from "./reducers/UserReducer"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
