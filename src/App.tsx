import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./routes/AppRouter";
import "./styles/tailwind.css";

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
