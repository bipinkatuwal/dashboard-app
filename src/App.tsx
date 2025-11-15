import { useEffect } from "react";
import type { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./store/users/usersSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  console.log(users, loading, error);

  useEffect(() => {
    dispatch(fetchUserData({ page: 2, limit: 10 }));
  }, [dispatch]);

  return <h2 className="text-center">Hello world</h2>;
}

export default App;
