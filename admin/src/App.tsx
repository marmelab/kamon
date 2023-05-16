import { Admin, Resource } from "react-admin";
import { UserList } from "./users";
import postgrestRestProvider from "@raphiniert/ra-data-postgrest";

const App = () => (
  <Admin
    dataProvider={postgrestRestProvider(import.meta.env.VITE_API_ENDPOINT)}
  >
    <Resource name="user" list={UserList} />
  </Admin>
);

export default App;
