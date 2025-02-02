

import useAuthStore from './Store/authStore';

import { PrRouter } from './router/PrRouter';
import { Dashboard } from './Dashboard';

export const App = () => {
  const isAuthenticated = useAuthStore((state) => state.Status);

  return (
    <>

      {
        isAuthenticated ? (
          <Dashboard />
        ) : (
          <PrRouter />
        )
      }

    </>
  )
}
