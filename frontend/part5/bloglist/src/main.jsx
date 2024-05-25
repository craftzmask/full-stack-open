import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import "./main.css";
import { NotificationContextProvider } from "./reducers/NotificationReducer";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
);
