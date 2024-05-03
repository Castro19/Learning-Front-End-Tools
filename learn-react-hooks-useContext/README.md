# How to use Context

## Introduction

- In this repo, I will be following this [tutorial](https://www.youtube.com/watch?v=HYKDUF8X3qI&ab_channel=CosdenSolutions)

- I am already very familiar with `useContext`, however, I want to master this topic and learn new ways to use context in my react applications.

- Allow data (state) to be accessible through all the components in your web application.

- Allows us to avoid prop drilling

## Version 1: The approach I take

Steps 1 - 4 will all take place in a file in our contexts folder, (e.g. `src/contexts/UserContext.tsx`)

### 1. Create a Context

`export const userContext = createContext<User | undefined >(undefined)`

- In typescript we assign it a type that can be `undefined` because we are creating the context outside of the place where we would have access to the `user`.

  - Initially our context will be undefined.

  - Account for future instances where our context variable is in undefined.

### 2. Create a Context Provider

```
export const UserProvider = ({children}: {children: ReactNode}) => {

}
```

### 3. Define Logic in our Provider

#### 3a. Define our state Variables:

```

const [user, setUser] = useState<User | undefined>(undefined)

```

#### 3b. Use an MVU approach, where we created our handle Functions to update user

```

const handleUserChange = (userId: number) => {
setUser(...)
}

```

#### 3c. Return the created Provider by passing down the necessary values to it

```

return (
<UserContext.Provider value={{ user }}>
{children}
</UserContext.Provider>
)

```

### 4. Export our custom hook and make sure we use it within the correct Provider

```

export const useUser = () => {
const context = useContext(UserContext);
if (!context) {
throw new Error("useUser must be used within a UserProvider");
}
return context;
};

```

### 5. Wrap our Provider at the root of our Project

- In `main.tsx` we will import our Provider and wrap the Provider around the entire application.

```

import { UserProvider } from "./contexts/UserContext";
...
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
    </React.StrictMode>
);

```

### 6. Access our Context Variables in any Component

- We are now able to access our context variables in any component, since we wrapped it around our root.

```

import { useUser } from "@/contexts/userContext";

const HomePage = () => {
// Context Variables
const { user } = useUser();
...
}

```

## Approach 2: The approach taken from the video

- In this approach, I am noticing a more flexible way to create context variables by not defining the values in the `context` file.

- In this approach we also wrap the provider around the just the component that needs it.

  - This allows the component's root and children to use the context variables, but no other component is allowed.

  - We also pass down our values in this provider instead.

- I believe this approach would work better for large companies.

- In this example, I will create a context provider for my dashboard to consume.

### 1. Create a Context

- In a file called `context.ts`, we do steps 1-2

```

export const DashboardContext = createContext<User | undefined >(undefined)

```

### 2. Create a Custom Hook

- In this custom hook, we will check if our context state variable is undefined.

  - If it is undefined, we will throw an error

  - Else, we will be able to use our context user state var.

```

export function useUserContext() {
  const user = useContext(DashboardContext);

  if (user === undefined) {
    throw new Error('useUserContext must be used with a DashboardContext');
  }

  return user;
}

```

### 3. Wrap our Dashboard in its Parent Component

- In this parent component, we will define the state variable we want to have be accessed in Dashboard and Dashboard's children component.

```
import {DashboardContext} from "./context"

const [user] = useState<User>(...);

return (
    <div>
        <DashboardContext.Provider value={user}>
            <Dashboard />
        </DashboardContext.Provider>
    </div>
)
```

### 4. Use a Consumer to get the state variable (user) directly from the Context

- We will `consume` this context using `useContext`

```
import { useUserContext } from './context';

export function Sidebar({}: SidebarProps) {
  const user = useUserContext();
  ...
}
```
