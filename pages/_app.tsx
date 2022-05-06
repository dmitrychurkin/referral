import type { AppPropsWithLayout } from '@/interfaces/global';

import { appWithTranslation } from 'next-i18next';
import { NotificationContainer } from 'react-notifications';

import createFirebaseApp from '@/infrastructure/firebase';
import StoreProvider from '@/infrastructure/store';
import AuthProvider from '@/infrastructure/auth';

import Default from '@/ui/templates/Default';

import '@/styles/globals.css';
import 'react-notifications/lib/notifications.css';

createFirebaseApp();

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <StoreProvider>
        <AuthProvider>
          <Default>
            {getLayout(<Component {...pageProps} />)}
          </Default>
        </AuthProvider>
      </StoreProvider>
      <NotificationContainer />
    </>
  );
}

export default appWithTranslation(App);
