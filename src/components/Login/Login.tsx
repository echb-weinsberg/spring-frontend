import { useAtom } from 'jotai';
import { useState } from 'react';
import logo from '../../assets/spring_logo.png';

import { Button, Flex, Paper, PasswordInput, TextInput, Image, Center } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { setAccessTokenInStorage } from '@/auth/token';
import { accessTokenAtom } from '@/auth/state';
import { useUsersAuth } from '@/api/queries/usersAuth';

export function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [, setAccessToken] = useAtom(accessTokenAtom);

  const usersPermissionsAuthApi = useUsersAuth();
  const handleSignIn = async () => {
    try {
      const data = await usersPermissionsAuthApi.authLocalPost({
        authLocalPostRequest: { identifier: username, password },
      });
      setAccessTokenInStorage(data.data.jwt!);
      setAccessToken(data.data.jwt);
    } catch (error) {}
  };

  return (
    <>
      <Flex bg={'var(--grey-1)'} h={'100vh'} justify={'center'} align={'center'}>
        <Paper p={'80px'} radius={'md'} w={'742px'} h="500px">
          <Center>
            <Image src={logo} w={100} />
          </Center>
          <TextInput
            data-testid="input-email"
            label={'Email'}
            placeholder={'Email'}
            required
            mt={'xl'}
            onChange={(event) => setUsername(event.currentTarget.value)}
            onKeyDown={getHotkeyHandler([['Enter', handleSignIn]])}
          />
          <PasswordInput
            data-testid="input-password"
            label={'Passwort'}
            placeholder={'Passwort'}
            required
            mt={'md'}
            onChange={(event) => setPassword(event.currentTarget.value)}
            onKeyDown={getHotkeyHandler([['Enter', handleSignIn]])}
          />

          <Button type="submit" fullWidth mt={'xl'} onClick={handleSignIn}>
            Login
          </Button>
        </Paper>
      </Flex>
    </>
  );
}
