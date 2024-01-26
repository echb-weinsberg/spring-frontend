import { useLoggedInUser } from '@/api/queries/users';
import { accessTokenAtom } from '@/auth/state';
import { removeAccessTokenFromStorage } from '@/auth/token';
import { Avatar, Box, Menu } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

export function UserAvatar() {
  const user = useLoggedInUser();
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signOut = () => {
    removeAccessTokenFromStorage();
    setAccessToken(undefined);
    queryClient.removeQueries({ queryKey: [{ authenticated: true }] });
    navigate('/');
  };
  return (
    <Menu>
      <Menu.Target>
        <Box style={{ cursor: 'pointer' }}>
          <Avatar radius="xl">{`${user.data?.firstname?.[0]}${user.data?.lastname?.[0]}`}</Avatar>
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{`Hallo ${user.data?.firstname}!`}</Menu.Label>
        <Menu.Item onClick={signOut}>Ausloggen</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
