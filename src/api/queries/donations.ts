import { useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accessTokenAtom } from '@/auth/state';
import { strapiBasePath } from '@/basePaths';
import {
  Configuration,
  Donation,
  DonationApi,
  DonationApiGetDonationsRequest,
  DonationListResponse,
  DonationListResponseDataItem,
  DonationRequest,
} from '@/generated';
import { queryAllPages } from './pagination';
import { dateToStrapiYearFilter, qsQueryToStrapiParams } from '../helpers';
import { currentYearAtom } from '@/state';

export type ListItemDonation = {
  id: number;
  attributes: Donation;
};

const PAGE_SIZE = 100;

export function useDonationsApi(accessToken: string | undefined) {
  const api =
    accessToken !== undefined
      ? new DonationApi(new Configuration({ accessToken }), strapiBasePath)
      : undefined;
  if (!api) return;

  return api;
}

export function useDonations() {
  const [year] = useAtom(currentYearAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useDonationsApi(accessToken);
  return useQuery({
    enabled: api !== undefined,
    queryKey: [`donations-${year}`],
    queryFn: async () => {
      const items: ListItemDonation[] = [];
      await queryAllPages<
        DonationApiGetDonationsRequest,
        DonationListResponse,
        DonationListResponseDataItem
      >(
        api!.getDonations.bind(api),
        (data) => {
          items.push(...(data as ListItemDonation[]));
        },
        { paginationPageSize: PAGE_SIZE },
        {
          params: {
            populate: 'donor',
            ...qsQueryToStrapiParams({
              filters: { date: dateToStrapiYearFilter(new Date(year)) },
            }),
          },
        }
      );
      return items;
    },
  });
}

export function useAddDonation(invalidate = true) {
  const [year] = useAtom(currentYearAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useDonationsApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DonationRequest) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.postDonations({
        donationRequest: payload,
      });
    },
    onSuccess: () => {
      if (api === undefined) return;
      if (invalidate) {
        // invalidate lists
        queryClient.invalidateQueries({
          queryKey: [`donations-${year}`],
        });
      }
    },
  });
}

export function useUpdateDonation() {
  const [year] = useAtom(currentYearAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useDonationsApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ([id, payload]: [id: number, payload: DonationRequest]) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.putDonationsId({
        id,
        donationRequest: payload,
      });
    },
    onSuccess: () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: [`donations-${year}`],
      });
    },
  });
}

export function useDeleteDonation() {
  const [year] = useAtom(currentYearAtom);
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useDonationsApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.deleteDonationsId({ id });
    },
    onSuccess: async () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: [`donations-${year}`],
      });
    },
  });
}
