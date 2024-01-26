import { Configuration } from '@/generated/configuration.ts';
import { UsersPermissionsAuthApi } from '@/generated/api.ts';
import { strapiBasePath } from '@/basePaths';

export function useUsersAuth() {
  return new UsersPermissionsAuthApi(new Configuration(), strapiBasePath);
}
