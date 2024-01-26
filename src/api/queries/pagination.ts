import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function queryAllPages<
  TApiRequest extends { paginationPage?: number },
  TListResponse extends {
    data?: TData[];
    meta?: {
      pagination?: { page?: number; pageCount?: number; pageSize?: number; total?: number };
    };
  },
  TData,
>(
  api: (
    requestParameters?: TApiRequest,
    options?: AxiosRequestConfig<unknown> | undefined
  ) => Promise<AxiosResponse<TListResponse, unknown>>,
  callback: (data: TData[]) => void,
  requestParameters?: TApiRequest,
  options?: AxiosRequestConfig<unknown> | undefined
) {
  let page = 0;
  let pageCount = 1;
  while (page < pageCount) {
    // eslint-disable-next-line no-await-in-loop
    const response = await api(
      {
        ...(requestParameters ?? ({} as TApiRequest)),
        // eslint-disable-next-line no-plusplus
        paginationPage: ++page,
      },
      options
    );
    page = response.data.meta?.pagination?.page ?? page;
    pageCount = response.data.meta?.pagination?.pageCount ?? 1;
    callback(response.data.data ?? []);
  }
}
