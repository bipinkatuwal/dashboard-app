# Dashboard Application

A modern, responsive dashboard web application built with React, Redux, TypeScript, and TailwindCSS. Features user data management with search, pagination, and theme switching capabilities.

## 🚀 Features

- **Responsive Design**: Mobile-first layout using TailwindCSS
- **Sidebar Navigation**: Clean navigation between Home and Data views
- **Data Management**: User data table with search and pagination
- **API Integration**: Fetches data from DummyJSON API
- **Error Handling**: Comprehensive error handling for API calls
- **Theme Support**: Light/dark/system theme switching
- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux Toolkit for predictable state updates
- **Testing**: Unit tests with Jest and React Testing Library

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Testing**: Jest, React Testing Library
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📋 Requirements Met

✅ Responsive layout with Bootstrap/TailwindCSS  
✅ Sidebar navigation with dynamic content  
✅ Data table with proper columns  
✅ Public API integration (DummyJSON)  
✅ Search and filtering functionality  
✅ Pagination implementation  
✅ Error handling with user-friendly messages  
✅ Git version control with meaningful commits  
✅ TypeScript for type safety  
✅ Unit tests with Jest/React Testing Library  
✅ End-to-end tests with Playwright  
✅ CI/CD pipeline with GitHub Actions  
✅ Deployment configuration for Netlify/Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dashboard-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

## 🧪 Testing

### Unit Tests

Run the unit test suite:

```bash
npm run test
```

### End-to-End Tests

Run E2E tests with Playwright:

```bash
# Run E2E tests headlessly
npm run test:e2e

# Run E2E tests with UI (interactive mode)
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run all tests (unit + E2E)
npm run test:all
```

### Test Coverage

Tests cover:

- **Unit Tests**: Component rendering, user interactions, API integration, error handling
- **E2E Tests**: Complete user workflows, navigation, search functionality, pagination, theme switching, responsive design, error states

### E2E Test Scenarios

- Dashboard navigation and routing
- User data loading and display
- Search and filtering functionality
- Pagination controls
- Theme switching (light/dark/system)
- Responsive design across devices
- Error handling and recovery
- Complete user workflows

## 🚀 Deployment

### Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── ThemeToggler.tsx # Theme switching
├── pages/              # Page components
│   ├── Home.tsx        # Dashboard home
│   └── Data.tsx        # User data table
├── store/              # Redux store
│   ├── users/          # User-related state
│   └── hooks.ts        # Typed Redux hooks
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── provider/           # Context providers
└── App.tsx             # Main application component
```

## 🔧 API Integration

Uses [DummyJSON API](https://dummyjson.com/) for user data:

- Endpoint: `https://dummyjson.com/users`
- Features: Pagination, user profiles with detailed information
- Error handling for network failures and API errors

## 🎨 Theme System

Supports three theme modes:

- **Light**: Clean, bright interface
- **Dark**: Easy on the eyes for low-light environments
- **System**: Automatically matches OS preference

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
