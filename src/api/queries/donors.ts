import { useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accessTokenAtom } from '@/auth/state';
import { strapiBasePath } from '@/basePaths';
import {
  Configuration,
  Donor,
  DonorApi,
  DonorApiGetDonorsRequest,
  DonorListResponse,
  DonorListResponseDataItem,
  DonorRequest,
} from '@/generated';
import { queryAllPages } from './pagination';
import { removeAccessTokenFromStorage } from '@/auth/token';
import { useNavigate } from 'react-router-dom';

export type ListItemDonor = {
  id: number;
  attributes: Donor;
};

const PAGE_SIZE = 100;

export function useDonorsApi(accessToken: string | undefined) {
  const api =
    accessToken !== undefined
      ? new DonorApi(new Configuration({ accessToken }), strapiBasePath)
      : undefined;
  if (!api) return;

  return api;
}

export function useDonors() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const navigate = useNavigate();
  const api = useDonorsApi(accessToken);
  const queryClient = useQueryClient();
  return useQuery({
    enabled: api !== undefined,
    queryKey: ['donors'],
    queryFn: async () => {
      const items: ListItemDonor[] = [];
      await queryAllPages<DonorApiGetDonorsRequest, DonorListResponse, DonorListResponseDataItem>(
        api!.getDonors.bind(api),
        (data) => {
          items.push(...(data as ListItemDonor[]));
        },
        {
          paginationPageSize: PAGE_SIZE,
        }
      ).catch((error) => {
        if (error.response.status === 401) {
          removeAccessTokenFromStorage();
          setAccessToken(undefined);
          queryClient.removeQueries({ queryKey: [{ authenticated: true }] });
          navigate('/');
        }
      });
      return items;
    },
  });
}

export function useAddDonor() {
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useDonorsApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DonorRequest) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.postDonors({
        donorRequest: payload,
      });
    },
    onSuccess: () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: ['donors'],
      });
    },
  });
}

export function useUpdateDonor() {
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useDonorsApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ([id, payload]: [id: number, payload: DonorRequest]) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.putDonorsId({
        id,
        donorRequest: payload,
      });
    },
    onSuccess: () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: ['donors'],
      });
    },
  });
}

export function useDeleteDonor() {
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useDonorsApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.deleteDonorsId({ id });
    },
    onSuccess: async () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: ['donors'],
      });
    },
  });
}
