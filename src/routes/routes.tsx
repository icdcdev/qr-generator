import type { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import PageOne from '../pages/PageOne';
import NotFound from '../pages/NotFound';
import PageTwo from '../pages/PageTwo';
import Template from '../layout/Template';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Template />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/one',
        element: <PageOne />,
      },
      {
        path: '/two',
        element: <PageTwo />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
