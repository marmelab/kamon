import { Admin, Resource } from "react-admin";
import { UserEdit, UserList, UserShow } from "./users";
import postgrestRestProvider from "@raphiniert/ra-data-postgrest";
import { GameList } from "./games";

const App = () => (
  <Admin
    dataProvider={postgrestRestProvider(import.meta.env.VITE_API_ENDPOINT)}
  >
    <Resource
      name="user"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      recordRepresentation="username"
    />
    <Resource name="game" list={GameList} />
  </Admin>
);

export default App;
