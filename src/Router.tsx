import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { Donors } from './components/Donors/Donors';
import { HomePage } from './pages/Home.page';
import { Donations } from './components/Donations/Donations';
import { ReceiptsWrappter } from './components/ReceiptsTemplates/ReceiptsWrappter';

export function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          index: true,
          loader: async () => redirect('/donors'),
        },
        {
          path: '/donors',
          element: <Donors />,
        },
        {
          path: '/donations',
          element: <Donations />,
        },
        {
          path: '/receipts',
          element: <ReceiptsWrappter />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
