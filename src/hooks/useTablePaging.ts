import { ListItemDonation } from '@/api/queries/donations';
import { ListItemDonor } from '@/api/queries/donors';
import { sortBy } from 'lodash';
import { DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 15;

type TableData = ListItemDonation | ListItemDonor;

export function useTablePaging(tableData: TableData[], defaultSortKey: string) {
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<ListItemDonation>>({
    columnAccessor: defaultSortKey,
    direction: 'desc',
  });
  const [records, setRecords] = useState(sortBy(tableData, defaultSortKey));

  const [pagedRecords, setPagedRecords] = useState(records.slice(0, PAGE_SIZE));
  useEffect(() => {
    const data = sortBy(tableData, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus, tableData]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setPagedRecords(records.slice(from, to));
  }, [page, PAGE_SIZE, records]);

  useEffect(() => setPage(1), [tableData]);

  const totalRecords = tableData.length;
  const recordsPerPage = PAGE_SIZE;

  return {
    pagedRecords,
    totalRecords,
    recordsPerPage,
    page,
    setPage,
    sortStatus,
    setSortStatus,
  };
}
