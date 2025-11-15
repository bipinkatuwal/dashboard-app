import { useUsers } from "./hooks/useUsers";

function App() {
  const { users } = useUsers();
  console.log(users);
  return <h2 className="text-center">Hello world</h2>;
}

export default App;
