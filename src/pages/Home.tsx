const Home = () => {
  return (
    <div className="w-full h-full p-6 bg-primary text-foreground">
      <h1 className="text-3xl font-bold">Dashboard Home</h1>
      <p className="text-sm opacity-80 mt-1">
        Navigate using the sidebar to view user data
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-muted border border-border p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-accent">100</p>
        </div>

        <div className="bg-muted border border-border p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold">API Source</h3>
          <p className="text-accent font-medium mt-2">DummyJSON API</p>
        </div>

        <div className="bg-muted border border-border p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold">Features</h3>
          <ul className="mt-2 space-y-1">
            <li>✓ Search</li>
            <li>✓ Pagination</li>
            <li>✓ Error Handling</li>
          </ul>
        </div>
      </div>

      <button className="mt-8 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg shadow transition">
        Go to Data Page
      </button>
    </div>
  );
};

export default Home;
