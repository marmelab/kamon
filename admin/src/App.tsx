import "./App.css";
import { Admin, Resource } from "react-admin";
import { UserList } from "./users";
import postgrestRestProvider from "@raphiniert/ra-data-postgrest";

const App = () => (
  <Admin dataProvider={postgrestRestProvider("http://localhost:3001")}>
    <Resource name="user" list={UserList} />
  </Admin>
);

export default App;
