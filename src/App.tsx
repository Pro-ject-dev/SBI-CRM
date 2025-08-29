import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./routes/AppRouter";
import CustomToast from "./components/UI/CustomToast";
import "./styles/tailwind.css";

const App = () => (
  <Provider store={store}>
    <AppRouter />
    <CustomToast />
  </Provider>
);

export default App;
