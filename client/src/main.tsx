import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/landing/index.tsx';
import Explore from './pages/explore/index.tsx';
//import Explore from './pages/explore/test.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
