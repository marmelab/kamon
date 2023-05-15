import "./App.css";
import { Admin, Resource, ListGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="user" list={ListGuesser} />
  </Admin>
);

export default App;
