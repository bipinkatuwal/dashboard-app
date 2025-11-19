interface PaginationProps {
  page: number;
  changePage: (page: number) => void;
  totalUsers: number;
  usersPerPage: number;
}

const Pagination = ({
  page,
  changePage,
  totalUsers,
  usersPerPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const getPageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (page > 3) pages.push(-1);

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 2) pages.push(-2);

    pages.push(totalPages);

    return pages;
  };
  return (
    <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
      <span className="text-foreground">
        Page {page} of {totalPages}
      </span>

      <div className="flex items-center gap-2 flex-wrap">
        {getPageNumbers().map((num, index) =>
          num > 0 ? (
            <button
              key={index}
              onClick={() => changePage(num)}
              className={`px-3 py-1 rounded-md border border-border ${
                num === page
                  ? "bg-accent text-primary border-accent"
                  : "bg-muted text-foreground hover:bg-muted-hover"
              } transition`}
            >
              {num}
            </button>
          ) : (
            <span key={index} className="px-2 text-foreground/60">
              …
            </span>
          )
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => page > 1 && changePage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-md bg-accent text-primary hover:bg-accent-hover disabled:opacity-40"
        >
          Prev
        </button>

        <button
          onClick={() => page < totalPages && changePage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-md bg-accent text-primary hover:bg-accent-hover disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
