import "./App.css";
import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./users";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="user" list={UserList} />
  </Admin>
);

export default App;
