# TaskFlow – Front-End Design and Project Plan

## 1. Front-End Mockup

The TaskFlow application uses a clean and simple dashboard design.

### Login and Registration
- TaskFlow logo and application name
- Username input
- Password input
- Login button
- Registration option

### Dashboard
- TaskFlow heading
- Welcome message
- Logout button
- New task input
- Add Task button
- My Tasks heading with task count
- List of tasks
- Complete/Undo button
- Delete button

### Basic wireframe

```text
----------------------------------------
               TASKFLOW
        Organise your day. Achieve more.
                              [Logout]
----------------------------------------

              MY DASHBOARD

       [ Enter a new task...       ]
                       [Add Task]

              MY TASKS (2)

       [ ] Complete my project
           [Complete] [Delete]

       [✓] Learn React
           [Undo] [Delete]

----------------------------------------
```

## 2. Break the UI into React Components

The application UI can be divided into these reusable components:

- App: Main application component
- AuthForm: Handles login and registration
- Dashboard: Displays the user's dashboard
- TaskForm: Allows users to create tasks
- TaskList: Displays all tasks
- TaskItem: Displays an individual task
- Header: Displays the application title and logout button

## 3. Component Hierarchy

```text
App
├── Header
├── AuthForm
└── Dashboard
    ├── TaskForm
    └── TaskList
        └── TaskItem
```

The components are organised according to their responsibilities. Smaller components can be reused and maintained independently.

## 4. State Management

React state is used to manage the application data.

- App: Manages authentication status and user information.
- Dashboard: Manages the task list.
- TaskForm: Manages the new task input.
- TaskItem: Receives task information and action handlers through props.
- AuthForm: Manages username and password input values.

Axios is used to communicate with the Express backend API.

JWT tokens are used to authenticate protected API requests.

## 5. Technology Choices

- React: Front-end user interface
- Vite: Front-end development and build tool
- Axios: API communication
- Node.js: Backend runtime
- Express.js: Backend API framework
- PostgreSQL: Database
- JWT: Authentication
- bcryptjs: Password hashing
- Render: Cloud deployment

## 6. Expected Application Behaviour

Users can:
1. Register an account.
2. Log in securely.
3. Create new tasks.
4. View their tasks.
5. Mark tasks as completed.
6. Undo task completion.
7. Delete tasks.
8. Log out.

The application protects user data by restricting task access to the authenticated user.