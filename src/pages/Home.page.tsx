import { AppShell, Text, Center, Flex, Image, NavLink } from '@mantine/core';
import logo from '../assets/spring_logo.png';
import { Outlet, useLocation } from 'react-router-dom';
import { IconCurrencyEuro, IconFileText, IconUser } from '@tabler/icons-react';
import { YearSelector } from '@/components/YearSelector';
import { UserAvatar } from '@/components/UserAvatar';

export function HomePage() {
  const location = useLocation();

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm' }} padding="md">
      <AppShell.Header>
        <Flex justify="space-between" p={10}>
          <Center>
            <Image w={40} src={logo} />
          </Center>
          <Flex gap={10}>
            <Center>
              <Text>Verrechnungsjahr:</Text>
            </Center>
            <Center>
              <YearSelector />
            </Center>
            <Center>
              <UserAvatar />
            </Center>
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          active={location.pathname === '/donors'}
          href="/donors"
          label="Spender"
          leftSection={<IconUser size="1rem" stroke={1.5} />}
        />
        <NavLink
          active={location.pathname === '/donations'}
          href="/donations"
          label="Spenden"
          leftSection={<IconCurrencyEuro size="1rem" stroke={1.5} />}
        />
        <NavLink
          active={location.pathname === '/receipts'}
          href="/receipts"
          label="Vorlagen"
          leftSection={<IconFileText size="1rem" stroke={1.5} />}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
