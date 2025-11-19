import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUserData } from "../store/users/userThunks";
import { setPage, setSearchQuery } from "../store/users/usersSlice";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const lastFetchedPageRef = useRef<number | null>(null);
  const previousSearchQueryRef = useRef<string>("");

  const {
    users,
    loading,
    error,
    page,
    usersPerPage,
    totalUsers,
    searchQuery,
    isSearching,
  } = useAppSelector((state) => state.users);

  // Effect for initial load and pagination (non-search)
  useEffect(() => {
    if (!searchQuery.trim() && lastFetchedPageRef.current !== page) {
      console.log(
        "useUsers: Fetching data for page:",
        page,
        "limit:",
        usersPerPage
      );
      lastFetchedPageRef.current = page;
      dispatch(fetchUserData({ page, limit: usersPerPage, searchQuery: "" }));
    }
  }, [dispatch, page, usersPerPage]);

  // Effect for search with debouncing
  useEffect(() => {
    if (searchQuery.trim()) {
      const searchTimeout = setTimeout(() => {
        console.log("useUsers: Searching for:", searchQuery);
        dispatch(fetchUserData({ page: 1, limit: usersPerPage, searchQuery }));
      }, 300);

      return () => clearTimeout(searchTimeout);
    }
  }, [dispatch, searchQuery, usersPerPage]);

  // Effect to handle when search is cleared
  useEffect(() => {
    const wasSearching = previousSearchQueryRef.current.trim() !== "";
    const isNowEmpty = searchQuery.trim() === "";

    if (wasSearching && isNowEmpty) {
      console.log(
        "useUsers: Search cleared, fetching regular data for page:",
        page
      );
      lastFetchedPageRef.current = page;
      dispatch(fetchUserData({ page, limit: usersPerPage, searchQuery: "" }));
    }

    previousSearchQueryRef.current = searchQuery;
  }, [dispatch, searchQuery, page, usersPerPage]);

  const changePage = (newPage: number) => dispatch(setPage(newPage));

  const updateSearchQuery = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  return {
    users,
    loading,
    error,
    page,
    usersPerPage,
    totalUsers,
    searchQuery,
    isSearching,
    changePage,
    updateSearchQuery,
  };
};
