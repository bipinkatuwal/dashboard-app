import Pagination from "../components/ui/Pagination";
import SearchInput from "../components/ui/SearchInput";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user";

const Data = () => {
  const {
    users,
    loading,
    error,
    searchQuery,
    updateSearchQuery,
    page,
    changePage,
    totalUsers,
    usersPerPage,
    isSearching,
  } = useUsers();

  return (
    <div className="w-full bg-primary p-4 md:p-6 h-full">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Users</h2>

      <SearchInput
        searchQuery={searchQuery}
        updateSearchQuery={updateSearchQuery}
      />

      {loading && (
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-muted rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 py-4 text-center">{error}</p>}

      {!loading && users.length === 0 && (
        <p className="text-center py-6 text-foreground/80">No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="overflow-auto max-h-[380px] md:max-h-[450px] border border-border rounded-lg">
          <table className="w-full min-w-full text-left text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Avatar</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Gender</th>
                <th className="px-4 py-3 font-medium">Age</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Address</th>
                <th className="px-4 py-3 font-medium">Username</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: User) => (
                <tr
                  key={user.id}
                  className="border-t border-border hover:bg-muted-hover transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                  </td>

                  <td className="px-4 py-3 text-foreground">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="px-4 py-3 text-foreground">{user.email}</td>
                  <td className="px-4 py-3 text-foreground">{user.phone}</td>

                  <td className="px-4 py-3 text-foreground capitalize">
                    {user.gender}
                  </td>

                  <td className="px-4 py-3 text-foreground">{user.age}</td>

                  <td className="px-4 py-3 text-foreground">
                    <div className="flex flex-col">
                      <span>{user.company.name}</span>
                      <span className="text-xs opacity-70">
                        {user.company.title} — {user.company.department}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-foreground">
                    <div className="flex flex-col">
                      <span>
                        {user.address.address}, {user.address.city}
                      </span>
                      <span className="text-xs opacity-70">
                        {user.address.state}, {user.address.country}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-foreground">{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && users.length > 0 && !isSearching && (
        <Pagination
          page={page}
          changePage={changePage}
          totalUsers={totalUsers}
          usersPerPage={usersPerPage}
        />
      )}
    </div>
  );
};

export default Data;
