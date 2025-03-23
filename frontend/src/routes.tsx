import { RouteObject } from 'react-router-dom';

// Импортируем компоненты маршрутов
import OhLayout from './routes/_oh/route';
import OhIndex from './routes/_oh._index/route';
import Settings from './routes/settings';
import AccountSettings from './routes/account-settings';
import Billing from './routes/billing';
import App from './routes/_oh.app/route';
import Browser from './routes/_oh.app.browser';
import Jupyter from './routes/_oh.app.jupyter';
import Served from './routes/app';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <OhLayout />,
    children: [
      {
        index: true,
        element: <OhIndex />,
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          {
            index: true,
            element: <AccountSettings />,
          },
          {
            path: 'billing',
            element: <Billing />,
          },
        ],
      },
      {
        path: 'conversations/:conversationId',
        element: <App />,
        children: [
          {
            path: 'browser',
            element: <Browser />,
          },
          {
            path: 'jupyter',
            element: <Jupyter />,
          },
          {
            path: 'served',
            element: <Served />,
          },
        ],
      },
    ],
  },
];