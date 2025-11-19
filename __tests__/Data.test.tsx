import { render, screen } from "@testing-library/react";
import Data from "../src/pages/Data";
import * as useUsersModule from "../src/hooks/useUsers";
import React from "react";

jest.mock("../src/hooks/useUsers");

const mockUseUsers = useUsersModule.useUsers as jest.MockedFunction<
  typeof useUsersModule.useUsers
>;

describe("Data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user data in table", () => {
    mockUseUsers.mockReturnValue({
      users: [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          maidenName: "Smith",
          age: 30,
          gender: "male",
          email: "john@example.com",
          phone: "1234567890",
          username: "johndoe",
          birthDate: "1995-01-01",
          image: "https://dummyimage.com/100x100",
          address: {
            address: "123 Main St",
            city: "Townsville",
            state: "TS",
            postalCode: "12345",
            country: "Countryland",
          },
          company: {
            name: "Acme Corp",
            title: "Developer",
            department: "Engineering",
          },
        },
      ],
      loading: false,
      error: null,
      page: 1,
      usersPerPage: 10,
      totalUsers: 1,
      searchQuery: "",
      updateSearchQuery: jest.fn(),
      changePage: jest.fn(),
      isSearching: false,
    });

    render(<Data />);

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "John Doe";
      })
    ).toBeInTheDocument();

    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "123 Main St, Townsville";
      })
    ).toBeInTheDocument();
  });

  it("shows 'No users found.' if users list is empty", () => {
    mockUseUsers.mockReturnValue({
      users: [],
      loading: false,
      error: null,
      page: 1,
      usersPerPage: 10,
      totalUsers: 0,
      searchQuery: "",
      updateSearchQuery: jest.fn(),
      changePage: jest.fn(),
      isSearching: false,
    });

    render(<Data />);
    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });
});
