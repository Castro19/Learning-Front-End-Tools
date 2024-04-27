# React Router Tutorial

- In this repo, I will follow this [YouTube tutorial](https://www.youtube.com/watch?v=oTIJunBa6MA&t=91s&ab_channel=CosdenSolutions) to learn the fundamentals of React Router.

- Below I will go through each step to implement React Router into my application

## 0. Install React Router

```
npm install react-router-dom
```

## 1. Create a Router in main.tsx file

```
const router = createBrowserRouter([{
  path: "/",
  element: <HomePage />,
  errorElement: <NotFoundPage />
},
{ ... },
...
])
```

- The createBrowserRouter takes as an input an array of objects where each object the path and the HTML displayed from the component specified in the element key

### 1b. Nest our RouterProvider

- In our main.tsx we want to place our RouterProvider tag inside the React Tags that render our project at its root

```
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
```

- Applying this establishes a routing context for the application.

  - RouterProvider component is built using the Context API from React.

## 2. Create Routes

- In the `createBrowserRouter` function we want to add more routes.

- An `errorElement` key is placed in the root path.
  - We specifiy a `NotFoundPage` component to direct the user to a specified page to tell the user that they are in a route that does not exist.
  - In this component, we want to direct the user back to the homepage.

## 3. Assigning Links

- Links in React Router Dom work similarly to `a` tags with the `href` attribute.

  - However, the key difference is that `Link` will not refresh the page
  - Instead `Link` will provide client side routing and enhance navigation spped.
  - This is because the `a` tag will reload the JS & HTML when the page re-loads and `Link` will just perform client side routing which is JS only.

```
    <div className="flex flex-col gap-2">
      404 Not Found
      <Link to="/">Home from Link</Link>
    </div>
```

### Bonus: Using NavLink

- NavLink works in the same way and takes the same props, however, we can now configure this to check which URL is active.

- Using CSS Styles in the `className` we can pass an `isActive` parameter to apply different styles on whether the `NavLink` has been clicked.

```
className={({ isActive }) => {
              return isActive ? 'text-primary-700' : '';
            }}
```

## 4. Creating Dynamic Routing

- In cases where we want the URL to have a dynamic parameter that can change for a specific area, we will use `/:[id]`

```
    path: '/profiles/:profileId',
    element: <ProfilePage />,
```

- In this code, we specify to react that the section of `:profileId` can change and be different but will still load in the element at ProfilePage.

## 5. Use Params in URL

- In the last step we had a dynamic parameter.

- We would now need to access the parameters from the URL.

  - This can be similar to passing down props.

- We access the parameters using `useParams`

  - This gives context to the component.

```
const params = useParams<{ profileId: string }>();
  return (
    <div>
      <h1>Profile Page {params.profileId}</h1>
    </div>
  );
```

- **Bonus for TypeScript**: We can specify the type of parameters to expect to enable type completion
  - `const params = useParams<{ profileId: string }>();`

## 6. Using Child Routes

- To enable content from components appearing onto screen next to their parent component instead of replacing them entirely.

  EX: A profile list is displayed onto the screen, when you click a profile, you expect to still see the profile list but now you will also see the component of the profile clicked next to the profile list.

- To do this, we need to add a `children` key in our object in `createBrowserRouter`.

```
{
 path: '/profiles',
    element: <ProfilesPage />,
    children: [
      {
        path: '/profiles/:profileId',
        element: <ProfilePage />,
      },
    ],
},
```

## 7. Render Child Routes in Outlet

- After the first step, there will not be any changes as the child component will not be rendered yet.

- **The Fix**: We neeed to use the `Outlet` component which acts as a placeholder for any child component in the parent route.

```
  <Outlet />

```

- In this code, any child component is now rendered where `Outlet` is placed.

## 8. Using Loaders

- Fetch data before a route component renders.

- Very useful for fetching data from a database and ensuring the data is available before the UI is displayed.

- **Primary Function**: Fetch data to be used for rendering a component

  - Commonly used with HTTP `GET` requests

### 8a. Define the Loader function

```
async function fetchProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data;
}
```

### 8b. Associate Loader w/ a Route:

- In the route definition, we will use the `loader` property & set it to the loader function we created.

```
  {
    path: '/products',
    element: <Products />, // Your component that displays products
    loader: fetchProducts, // The loader function
  },
```

### 8c. Access the Fetched Data in Component

- Inside the `Products` component, we can use the `useLoaderData` hook to access the data returned by the loader.

```
  const products = useLoaderData();
```

## 9. Using Actions

- Handle data mutations like (Creating, Updating, or deleting data)

- Often involve form submissions

### 9a. Define an Action Function

- Create a function that performs the data mutation logic.

```
async function updateProduct(productId, newName) {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ name: newName }),
  });

  // Handle the response and potential errors
}
```

### 9b. Associatte Action with a Route

- In the route definition, we can use the `action` property & set it to the action function created.

```
  {
    path: '/products/:productId/edit',
    element: <EditProduct />, // Your component for editing products
    action: updateProduct, // The action function
  },
```

### 9c. Handling Form Submission

- Inside the form component, we will prevent the default form submission behavior and call the action function.

```
function EditProduct({ match }) { // Access product ID from route params
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProduct(match.params.productId, newName); // Call action with ID and new name
    navigate('/products'); // Redirect to product list after successful update
  };

  // ... rest of your form component
}
```

## 10. Navigate between Routes

- Use the `useNavigate` hook to navigate between routes in react application.

```
  const navigate = useNavigate();
  navigate('/new-route'); // Navigate to a new route
```

### Bonus: Provide Navigation Options

- Can optionally pass a 2nd argument to `navigate` to specifiy additional options for navigation.

- `state:` An object containing data you want to pass along to the target route component. You can access this data using useLocation in the target component.

```
navigate('/profile', { userId: 123 });
```

- `replace`: A boolean indicating whether to replace the current history entry or create a new one. Defaults to false (creates a new history entry).

```
navigate('/login', { replace: true }); // Replaces current history entry
```
