import { accessTokenAtom } from '@/auth/state';
import { strapiBasePath } from '@/basePaths';
import { Configuration, UsersPermissionsUser, UsersPermissionsUsersRolesApi } from '@/generated';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

export function useUsersApi(accessToken: string | undefined) {
  const api =
    accessToken !== undefined
      ? new UsersPermissionsUsersRolesApi(new Configuration({ accessToken }), strapiBasePath)
      : undefined;
  if (!api) return;

  return api;
}

type User = {
  organisation: {
    id: number;
    name: string;
    logo: {
      url: string;
    };
  };
  firstname: string;
  lastname: string;
} & UsersPermissionsUser;

export function useLoggedInUser() {
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useUsersApi(accessToken);
  return useQuery({
    enabled: api !== undefined,
    queryKey: ['loggedInUser'],
    queryFn: async () => {
      const response = await api?.usersMeGet({ params: { populate: 'organisation.logo' } });
      return response?.data as User | undefined;
    },
  });
}
