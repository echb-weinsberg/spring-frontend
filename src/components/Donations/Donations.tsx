import { ListItemDonation, useDonations } from '@/api/queries/donations';
import { Title, Flex, Button, Group, TextInput, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronUp,
  IconFileTypeCsv,
  IconFileTypePdf,
  IconPlus,
  IconSearch,
  IconSelector,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { AddDonationModal } from './AddDonationModal';
import { CsvImportModal } from './CsvImportModal';
import { useDonors } from '@/api/queries/donors';
import { useDonationsColumns } from './hooks/useDonationsColumns';
import { downloadPdf, sortByName } from './helpers';
import { useState } from 'react';
import { fuzzySearch } from '@/helpers';
import { useTablePaging } from '@/hooks/useTablePaging';
import { PdfDocument } from '../PDF/PdfDocument';
import { modals } from '@mantine/modals';
import { useReceiptTemplates } from '@/api/queries/receiptTemplates';
import { notifications } from '@mantine/notifications';
import { useLoggedInUser } from '@/api/queries/users';
import { strapiBasePath } from '@/basePaths';

const SEARCH_KEYS = [
  'attributes.donor.data.attributes.name',
  'attributes.donor.data.attributes.surname',
  'attributes.note',
];

type PDF_EXPORT_TYPE = 'single' | 'collection' | 'all';

export function Donations() {
  const loggedInUser = useLoggedInUser();

  const receiptTemplates = useReceiptTemplates();
  const { data: donationsData, isLoading } = useDonations();
  const donors = useDonors();
  const [filter, setFilter] = useState<ListItemDonation[]>();
  const donations = filter !== undefined ? filter : donationsData ?? [];

  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [addEntryOpened, addEntryHandlers] = useDisclosure(false);
  const [csvImportOpened, csvImportHandlers] = useDisclosure(false);
  const [donationToUpdate, setDonationToUpdate] = useState<ListItemDonation | null>(null);

  const columns = useDonationsColumns(setDonationToUpdate);

  const generatePdf = async (type: 'single' | 'collection' | 'all') => {
    const { single, collection } = receiptTemplates.data?.[0].attributes.templateStructure ?? {};
    if (!single || !collection) notifications.show({ title: 'Fehler', message: 'Vorlage fehlt' });

    const donorsWithSingleDonation =
      donors.data
        ?.filter(
          (donor) =>
            donations.filter((donation) => donation.attributes.donor?.data?.id === donor.id)
              .length === 1
        )
        .sort(sortByName) ?? [];

    const donorsWithMultipleDonations =
      donors.data
        ?.filter(
          (donor) =>
            donations.filter((donation) => donation.attributes.donor?.data?.id === donor.id)
              .length > 1
        )
        .sort(sortByName) ?? [];

    let donorsToExport = [];
    switch (type) {
      case 'single':
        donorsToExport = donorsWithSingleDonation;
        break;
      case 'collection':
        donorsToExport = donorsWithMultipleDonations;
        break;
      case 'all':
        donorsToExport = [...donorsWithSingleDonation, ...donorsWithMultipleDonations];
        break;
    }

    setIsLoadingPdf(true);
    await downloadPdf(
      PdfDocument({
        donors: donorsToExport ?? [],
        donations,
        receiptTemplates: { single, collection },
        logoUrl: `${strapiBasePath.replace('/api', '')}${loggedInUser.data?.organisation?.logo?.url}`,
      })
    );
    setIsLoadingPdf(false);
  };

  const openPdfModal = () => {
    const generateAndCloseModal = (type: PDF_EXPORT_TYPE) => {
      generatePdf(type);
      modals.closeAll();
    };

    modals.open({
      title: 'Export Spendenbescheinigungen',
      children: (
        <>
          <Text size="sm">Welche Spendenbescheinigungen wollen Sie exportieren?</Text>
          <Group>
            <Button
              variant="outline"
              fullWidth
              onClick={() => generateAndCloseModal('single')}
              mt="md"
            >
              Einzelbescheinigungen
            </Button>
            <Button variant="outline" fullWidth onClick={() => generateAndCloseModal('collection')}>
              Sammelbescheinigungen
            </Button>
            <Button variant="filled" fullWidth onClick={() => generateAndCloseModal('all')}>
              Alle
            </Button>
          </Group>
        </>
      ),
    });
  };

  const { pagedRecords, totalRecords, recordsPerPage, page, setPage, sortStatus, setSortStatus } =
    useTablePaging(donations, 'attributes.date');

  return (
    <>
      <Flex pb={20} justify={'space-between'}>
        <Title>Spendeneingänge</Title>
        <Group>
          <Button leftSection={<IconPlus />} onClick={addEntryHandlers.open}>
            Hinzufügen
          </Button>
          <Button leftSection={<IconFileTypeCsv />} onClick={csvImportHandlers.open}>
            CSV Import
          </Button>
          <Button
            loading={isLoadingPdf}
            leftSection={<IconFileTypePdf />}
            onClick={openPdfModal}
            disabled={donations.length === 0}
          >
            Spendenbescheinigungen
          </Button>
        </Group>
      </Flex>
      <AddDonationModal opened={addEntryOpened} onClose={addEntryHandlers.close} />
      <CsvImportModal opened={csvImportOpened} onClose={csvImportHandlers.close} />
      {donationToUpdate && (
        <AddDonationModal
          initialData={donationToUpdate}
          opened
          onClose={() => setDonationToUpdate(null)}
        />
      )}

      <TextInput
        mb={10}
        leftSection={<IconSearch size="15" />}
        placeholder="Suche nach Name/Verwendungszweck"
        onChange={(event) =>
          setFilter(
            event.currentTarget.value
              ? fuzzySearch(event.currentTarget.value, SEARCH_KEYS, donationsData ?? [])
              : undefined
          )
        }
      />

      <DataTable
        fetching={isLoading}
        columns={columns}
        records={pagedRecords}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        sortIcons={{
          sorted: <IconChevronUp size={14} />,
          unsorted: <IconSelector size={14} />,
        }}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        page={page}
        onPageChange={setPage}
        emptyState={<></>}
      />
    </>
  );
}
