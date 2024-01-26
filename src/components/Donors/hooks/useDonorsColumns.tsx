import { ListItemDonor, useDeleteDonor } from '@/api/queries/donors';
import { getReadableTitle } from '@/components/PDF/helpers';
import { ActionIcon, Center, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTableColumn } from 'mantine-datatable';

export function useDonorsColumns(setDonorToUpdate: (donor: ListItemDonor) => void) {
  const deleteDonor = useDeleteDonor();

  const openDeleteModal = (donorId: number) =>
    modals.openConfirmModal({
      title: 'Spender löschen',
      children: <Text size="sm">Wollen Sie den Spender wirklich löschen?</Text>,
      labels: { confirm: 'Löschen', cancel: 'Abbrechen' },
      onConfirm: () =>
        deleteDonor.mutate(donorId, {
          onSuccess: () => {
            notifications.show({
              title: 'Erfolg',
              message: 'Spender wurde gelöscht',
            });
          },
          onError: () => {
            notifications.show({
              title: 'Fehler',
              message: 'Spender konnte nicht gelöscht werden',
            });
          },
        }),
    });

  const columns: DataTableColumn<ListItemDonor>[] = [
    {
      accessor: 'delete',
      title: '',
      width: 30,
      render: (donor) => (
        <Center>
          <ActionIcon size="sm" variant="white" onClick={() => openDeleteModal(donor.id)}>
            <IconTrash />
          </ActionIcon>
        </Center>
      ),
    },
    {
      accessor: 'edit',
      title: '',
      width: 30,
      render: (donor) => (
        <Center>
          <ActionIcon size="sm" variant="white" onClick={() => setDonorToUpdate(donor)}>
            <IconEdit />
          </ActionIcon>
        </Center>
      ),
    },
    {
      accessor: 'title',
      sortable: true,
      title: 'Anrede',
      render: (donor) => (donor.attributes.title ? getReadableTitle(donor.attributes.title) : ''),
    },
    { accessor: 'attributes.name', title: 'Nachname', sortable: true },

    { accessor: 'attributes.surname', title: 'Vorname', sortable: true },

    { accessor: 'attributes.street', title: 'Straße', sortable: true },

    { accessor: 'attributes.plz', title: 'PLZ', sortable: true },

    { accessor: 'attributes.city', title: 'Stadt', sortable: true },

    { accessor: 'attributes.country', title: 'Land', sortable: true },

    {
      accessor: 'wantReceipt',
      sortable: true,
      title: 'Will Bescheinigung',
      render: (donor) => (donor.attributes.wantReceipt ? 'Ja' : 'Nein'),
    },
    {
      accessor: 'ibans',
      sortable: true,
      title: 'IBANs',
      render: (donor) => donor.attributes.ibans.join(', '),
    },
  ];

  return columns;
}
