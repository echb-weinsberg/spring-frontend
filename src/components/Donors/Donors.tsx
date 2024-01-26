import { DataTable } from 'mantine-datatable';
import { Flex, Title, Button, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ListItemDonor, useDonors } from '@/api/queries/donors';
import { AddDonorModal } from './AddDonorModal';
import { useState } from 'react';
import { IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import { useDonorsColumns } from './hooks/useDonorsColumns';
import { useTablePaging } from '@/hooks/useTablePaging';
import { fuzzySearch } from '@/helpers';

const SEARCH_KEYS = ['attributes.name', 'attributes.surname', 'attributes.combinedIbans'];

export function Donors() {
  const { data: donorsData, isLoading } = useDonors();
  const [opened, handlers] = useDisclosure(false);
  const [donorToUpdate, setDonorToUpdate] = useState<ListItemDonor | null>(null);
  const [filter, setFilter] = useState<ListItemDonor[]>();
  const donors = filter !== undefined ? filter : donorsData ?? [];

  const columns = useDonorsColumns(setDonorToUpdate);

  const { pagedRecords, totalRecords, recordsPerPage, page, setPage, sortStatus, setSortStatus } =
    useTablePaging(donors, 'attributes.name');

  return (
    <>
      <Flex pb={20} justify={'space-between'}>
        <Title>Spender</Title>
        <Button onClick={handlers.open}>Hinzufügen</Button>
      </Flex>
      <AddDonorModal opened={opened} onClose={handlers.close} />
      {donorToUpdate && (
        <AddDonorModal
          initialData={donorToUpdate}
          opened
          onClose={() => setDonorToUpdate(null)}
          title="Spender bearbeiten"
        />
      )}
      <TextInput
        mb={10}
        leftSection={<IconSearch size="15" />}
        placeholder="Suche nach Name/IBAN"
        onChange={(event) =>
          setFilter(
            event.currentTarget.value
              ? fuzzySearch(
                  event.currentTarget.value,
                  SEARCH_KEYS,
                  (donorsData ?? []).map((donor) => ({
                    ...donor,
                    attributes: {
                      ...donor.attributes,
                      combinedIbans: donor.attributes.ibans.join(' '),
                    },
                  }))
                )
              : undefined
          )
        }
      />
      <DataTable
        fetching={isLoading}
        columns={columns}
        records={pagedRecords}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        page={page}
        onPageChange={setPage}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        sortIcons={{
          sorted: <IconChevronUp size={14} />,
          unsorted: <IconSelector size={14} />,
        }}
        emptyState={<></>}
      />
    </>
  );
}
