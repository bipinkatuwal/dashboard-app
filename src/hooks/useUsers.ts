import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUserData } from "../store/users/userThunks";
import { setPage, setSearchQuery } from "../store/users/usersSlice";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const { users, loading, error, page, usersPerPage, totalUsers, searchQuery } =
    useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserData({ page, limit: usersPerPage }));
  }, [page]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const changePage = (newPage: number) => dispatch(setPage(newPage));

  const updateSearchQuery = (query: string) => dispatch(setSearchQuery(query));

  return {
    users: filteredUsers,
    loading,
    error,
    page,
    usersPerPage,
    totalUsers,
    searchQuery,
    changePage,
    updateSearchQuery,
  };
};
