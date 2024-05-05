# Protected Routes

## Introduction

- In this repo, I will follow this [tutorial](https://www.youtube.com/watch?v=eFPvXGZETiY&ab_channel=CosdenSolutions) on how to create `Protected Routes`.

- This is extremely important for me as most of my web applications depend on firebase for user authentication and I want to implement best practices for authorization.

## Prerequisite Knowledge

- **React Router**, **useContext**, **Authorization**:

- I am currently using all of the above in my web applications.

## What are Protected Routes?

- Routes or wrappers around routes that add a layer of security before rendering the target component.

- Check if a user meets specific criteria (like being logged in or having the correct permissions) before allowing access to a route.

  - If user does not meet requirements, display a `401 Unauthorized`

## How to implement Protected Routes

### 1. Setup Auth State

- Use a Global State management library to manage the user's state in react

  - I will use the `Context API` to handle user's state

### 2. Create the Protected Route Component

#### 2a. Import necessary libraries

```
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthProvider';
```

- This Protected Route component will need to have `children`, since it will wrap other routes

  - In typescript, we can import `PropsWithChildren` to define the type

#### 2b. Check the User's Logged in status

- Use the `useAuth` Custom Hook to get the user's state:

#### 2c. No Auth: Redirect user to signin page

- Create a `useEffect` to redirect the user to the signin page if they are not logged in.

- Using `replace: true` will automatically redirect user to the sign in page, no matter how they navigate within the urls:
  ```
  navigate('/signin', { replace: true });
  ```

#### 2d. Auth: Return our protected route

- Our children will be the route we are protecting

- If the user is logged in, then we can `return children` to give the user access

### 3. Protect our Routes

- In our `main.tsx`, we can now wrap any route we want to protect with authorization with this `protected` route.

```
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  ...
])
```
