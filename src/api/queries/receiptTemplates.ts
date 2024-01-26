import { useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accessTokenAtom } from '@/auth/state';
import { strapiBasePath } from '@/basePaths';
import {
  Configuration,
  ReceiptTemplate,
  ReceiptTemplateApi,
  ReceiptTemplateApiGetReceiptTemplatesRequest,
  ReceiptTemplateListResponse,
  ReceiptTemplateListResponseDataItem,
  ReceiptTemplateRequest,
} from '@/generated';
import { queryAllPages } from './pagination';
import { removeAccessTokenFromStorage } from '@/auth/token';
import { useNavigate } from 'react-router-dom';

export type ListItemReceiptTemplate = {
  id: number;
  attributes: ReceiptTemplate;
};

const PAGE_SIZE = 100;

export function useReceiptTemplatesApi(accessToken: string | undefined) {
  const api =
    accessToken !== undefined
      ? new ReceiptTemplateApi(new Configuration({ accessToken }), strapiBasePath)
      : undefined;
  if (!api) return;

  return api;
}

export function useReceiptTemplates() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const navigate = useNavigate();
  const api = useReceiptTemplatesApi(accessToken);
  const queryClient = useQueryClient();
  return useQuery({
    enabled: api !== undefined,
    queryKey: ['receiptTemplates'],
    queryFn: async () => {
      const items: ListItemReceiptTemplate[] = [];
      await queryAllPages<
        ReceiptTemplateApiGetReceiptTemplatesRequest,
        ReceiptTemplateListResponse,
        ReceiptTemplateListResponseDataItem
      >(
        api!.getReceiptTemplates.bind(api),
        (data) => {
          items.push(...(data as ListItemReceiptTemplate[]));
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

export function useAddReceiptTemplate() {
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useReceiptTemplatesApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ReceiptTemplateRequest) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.postReceiptTemplates({
        receiptTemplateRequest: payload,
      });
    },
    onSuccess: () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: ['receiptTemplates'],
      });
    },
  });
}

export function useUpdateReceiptTemplate() {
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useReceiptTemplatesApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ([id, payload]: [id: number, payload: ReceiptTemplateRequest]) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.putReceiptTemplatesId({
        id,
        receiptTemplateRequest: payload,
      });
    },
    onSuccess: () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: ['receiptTemplates'],
      });
    },
  });
}

export function useDeleteReceiptTemplate() {
  const [accessToken] = useAtom(accessTokenAtom);
  const api = useReceiptTemplatesApi(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      if (api === undefined) throw new Error('Not logged in');
      return api.deleteReceiptTemplatesId({ id });
    },
    onSuccess: async () => {
      if (api === undefined) return;
      // invalidate lists
      queryClient.invalidateQueries({
        queryKey: ['receiptTemplates'],
      });
    },
  });
}
