type SearchQueryType = string;

interface ChildComponentProps {
  searchQuery: SearchQueryType;
  updateSearchQuery: (query: SearchQueryType) => void;
}
const SearchInput = ({
  searchQuery,
  updateSearchQuery,
}: ChildComponentProps) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={searchQuery}
      onChange={(e) => updateSearchQuery(e.target.value)}
      className="mb-4 w-full md:w-1/3 p-2 border border-border rounded-md bg-primary text-foreground"
    />
  );
};

export default SearchInput;
