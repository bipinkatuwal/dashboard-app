export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
}

export interface DummyJsonResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  usersPerPage: number;
  totalUsers: number;
}
