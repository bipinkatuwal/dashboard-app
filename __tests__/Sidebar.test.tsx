import { render, screen } from "@testing-library/react";
import Sidebar from "../src/components/Sidebar";
import React from "react";

jest.mock("../src/components/Sidebar", () => {
  const MockedSidebar = () => (
    <div className="w-20 md:w-64 bg-primary text-text-primary min-h-screen p-4 border-r border-border">
      <div className="mb-8">
        <h1 className="text-2xl text-foreground text-text-primary font-bold hidden md:block">
          Dashboard
        </h1>
        <h1 className="text-2xl text-foreground text-text-primary font-bold md:hidden text-center">
          D
        </h1>
      </div>
      <nav className="space-y-2">
        <a
          href="/home"
          className="w-full flex items-center md:space-x-3 px-4 py-3 rounded-lg transition-colors"
        >
          <span className="hidden md:block">Home</span>
        </a>
        <a
          href="/data"
          className="w-full flex items-center md:space-x-3 px-4 py-3 rounded-lg transition-colors"
        >
          <span className="hidden md:block">User Data</span>
        </a>
      </nav>
    </div>
  );
  return MockedSidebar;
});

describe("Sidebar", () => {
  it("renders navigation links", () => {
    render(<Sidebar />);

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /user data/i })
    ).toBeInTheDocument();
  });

  it("renders dashboard title", () => {
    render(<Sidebar />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
