import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import 'dayjs/locale/de';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { theme } from './theme';
import { Login } from './components/Login/Login';
import { accessTokenAtom } from './auth/state';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import { Router } from './Router';
import { DatesProvider } from '@mantine/dates';

const queryClient = new QueryClient();

export default function App() {
  const [accessToken] = useAtom(accessTokenAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications limit={1} />
        <DatesProvider settings={{ locale: 'de' }}>
          <ModalsProvider>{accessToken ? <Router /> : <Login />}</ModalsProvider>
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
