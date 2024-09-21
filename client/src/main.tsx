import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

// App and CSS
import App from "./App.tsx";
import "./index.css";

// Redux
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
