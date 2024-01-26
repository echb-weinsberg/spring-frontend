import { ListItemDonation, useDeleteDonation } from '@/api/queries/donations';
import { ActionIcon, Center, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTableColumn } from 'mantine-datatable';
import { formatToEuro } from '../helpers';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

export function useDonationsColumns(setDonationToUpdate: (donation: ListItemDonation) => void) {
  const deleteDonation = useDeleteDonation();

  const openDeleteModal = (donationId: number) =>
    modals.openConfirmModal({
      title: 'Spende löschen',
      children: <Text size="sm">Wollen Sie den Spendeneintrag wirklich löschen?</Text>,
      labels: { confirm: 'Löschen', cancel: 'Abbrechen' },
      onConfirm: () =>
        deleteDonation.mutate(donationId, {
          onSuccess: () => {
            notifications.show({
              title: 'Erfolg',
              message: 'Spende wurde gelöscht',
            });
          },
          onError: () => {
            notifications.show({
              title: 'Fehler',
              message: 'Spende konnte nicht gelöscht werden',
            });
          },
        }),
    });

  const columns: DataTableColumn<ListItemDonation>[] = [
    {
      accessor: 'delete',
      width: 30,
      title: '',
      render: (donation) => (
        <Center>
          <ActionIcon size="sm" variant="white" onClick={() => openDeleteModal(donation.id)}>
            <IconTrash />
          </ActionIcon>
        </Center>
      ),
    },
    {
      accessor: 'edit',
      width: 30,
      title: '',
      render: (donation) => (
        <Center>
          <ActionIcon size="sm" variant="white" onClick={() => setDonationToUpdate(donation)}>
            <IconEdit />
          </ActionIcon>
        </Center>
      ),
    },
    {
      accessor: 'attributes.amount',
      title: 'Betrag',
      sortable: true,
      render: (donation) =>
        donation.attributes.amount ? formatToEuro(donation.attributes.amount) : '',
    },
    {
      accessor: 'attributes.date',
      title: 'Datum',
      sortable: true,
      render: (donation) =>
        donation.attributes.date
          ? new Date(donation.attributes.date).toLocaleDateString('de-DE')
          : '',
    },
    {
      accessor: 'attributes.donor.data.attributes.name',
      title: 'Spender',
      sortable: true,
      render: (donation) =>
        `${donation.attributes.donor?.data?.attributes?.name}, ${donation.attributes.donor?.data?.attributes?.surname}`,
    },
    {
      accessor: 'attributes.note',
      title: 'Bemerkung',
      sortable: true,
    },
  ];
  return columns;
}
