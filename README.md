# Todo Application

A modern, feature-rich Todo application built with React, TypeScript, and modern web technologies. This application demonstrates best practices in React development with a focus on state management, drag-and-drop functionality, and responsive design.

## 🚀 Features

- **📝 Todo Management**: Create, read, update, and delete todos
- **🎯 Task Completion**: Mark todos as completed with visual feedback
- **🔄 Drag & Drop**: Reorder todos using intuitive drag-and-drop functionality
- **📱 Responsive Design**: Beautiful, mobile-friendly interface
- **⚡ Real-time Updates**: Instant UI updates with optimistic rendering
- **🎨 Modern UI**: Clean, modern design with Tailwind CSS
- **🔒 Type Safety**: Full TypeScript support for better development experience
- **📊 State Management**: Redux Toolkit for predictable state management
- **🔄 Data Fetching**: React Query for efficient server state management
- **✅ Form Validation**: Zod schema validation with React Hook Form

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### State Management & Data Fetching
- **Redux Toolkit** - Predictable state management
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Performant forms with validation

### UI/UX
- **@dnd-kit** - Accessible drag-and-drop functionality
- **Zod** - TypeScript-first schema validation
- **Autoprefixer & PostCSS** - CSS processing

### Development Tools
- **ESLint** - Code linting and formatting
- **Vitest** - Fast unit testing framework
- **Husky** - Git hooks for code quality
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eslint
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run start
   # or
   pnpm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🧪 Testing

Run the test suite:

```bash
npm run test
# or
pnpm test
```

## 🏗️ Project Structure

```
src/
├── todo/
│   ├── _common/
│   │   └── types.ts          # Shared TypeScript interfaces
│   ├── components/
│   │   ├── addTodoForm/      # Todo creation form
│   │   ├── draggableTodoCard.tsx
│   │   ├── error.tsx         # Error handling component
│   │   ├── footer/           # Application footer
│   │   ├── layout/           # Main layout component
│   │   ├── loading.tsx       # Loading states
│   │   ├── mutationStatus/   # Status indicators
│   │   └── todoList/         # Todo list component
│   ├── hooks/
│   │   ├── useDelete.ts      # Delete todo hook
│   │   ├── useDrag.ts        # Drag and drop hook
│   │   └── useUpdate.ts      # Update todo hook
│   ├── query/
│   │   ├── api.ts            # API configuration
│   │   └── index.ts          # React Query hooks
│   ├── store/
│   │   ├── hooks.ts          # Redux hooks
│   │   ├── index.ts          # Store configuration
│   │   ├── todoSlice.ts      # Redux slice
│   │   └── utils.ts          # Store utilities
│   ├── types.ts              # Todo-specific types
│   ├── validation.ts         # Zod validation schemas
│   └── index.tsx             # Main todo component
├── App.tsx                   # Root application component
└── main.tsx                  # Application entry point
```

## 🎯 Key Features Explained

### Drag & Drop Reordering
The application uses `@dnd-kit` for accessible drag-and-drop functionality. Users can reorder todos by dragging them to new positions, with the order persisted in the Redux store.

### Optimistic Updates
The UI updates immediately when users perform actions (create, update, delete), providing a snappy user experience while the actual API calls happen in the background.

### Form Validation
All forms use Zod schemas for validation, ensuring data integrity and providing clear error messages to users.

### Responsive Layout
The application features a fixed header and footer with a scrollable content area, ensuring the interface remains usable on all device sizes.

## 🔧 Available Scripts

- `npm run start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint

## 🧪 Writing Tests

The project uses Vitest for testing. Here's an example of how to test utility functions:

```typescript
// Example test for utils.ts
import { describe, it, expect } from 'vitest'
import { getTodoIndex } from './store/utils'

describe('getTodoIndex', () => {
  it('should return the correct index for existing todo', () => {
    const todos = [
      { id: 1, todo: 'Test 1', completed: false, userId: 1 },
      { id: 2, todo: 'Test 2', completed: true, userId: 1 }
    ]
    
    expect(getTodoIndex(todos, 2)).toBe(1)
  })

  it('should return -1 for non-existing todo', () => {
    const todos = [
      { id: 1, todo: 'Test 1', completed: false, userId: 1 }
    ]
    
    expect(getTodoIndex(todos, 999)).toBe(-1)
  })
})
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [@dnd-kit](https://dndkit.com/) for the excellent drag-and-drop library
- [TanStack Query](https://tanstack.com/query) for server state management
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
