import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Allows us to connect our redux store to our react application using the context api.
import { Provider } from "react-redux";
// Provide store to the provider to use the store in our application in any component.
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
