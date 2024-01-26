import { Stepper } from '@mantine/core';
import { CsvDropzone } from './CsvDropzone';
import { ParseResult } from 'papaparse';
import { useMemo, useState } from 'react';
import { DonorDataCreation } from '../Donations/DataCreation';
import { useDonors } from '@/api/queries/donors';
import {
  filterDuplicatesByAttribute,
  getListItemDonorFromCsvLine,
  transformCsvDateString,
} from '../Donations/helpers';

import { useAddDonation } from '@/api/queries/donations';
import { notifications } from '@mantine/notifications';
import { CsvLine } from '@/csvImport/csvImport';
import { DataImport } from './DataImport';
import { useQueryClient } from '@tanstack/react-query';

export function ImportStepper({ onClose }: { onClose: () => void }) {
  const [parsedData, setParsedData] = useState<ParseResult<CsvLine>>();
  const donors = useDonors();
  const addDonation = useAddDonation(false);
  const [isLoading, setIsLoading] = useState(false);
  const [donorsToSkip, setDonorsToSkip] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const uploadData = (data: ParseResult<CsvLine>) => {
    setParsedData(data);
  };

  const dataWithoutSkippedDonors = parsedData?.data.filter(
    (d) => !donorsToSkip.includes(d['IBAN Zahlungsbeteiligter'] + d['Verwendungszweck'])
  );

  const addDonations = () => {
    if (!dataWithoutSkippedDonors?.length) return;
    setIsLoading(true);
    dataWithoutSkippedDonors?.forEach((item, index) => {
      const donor = donors.data?.find((d) =>
        d.attributes.ibans.some(
          (donorIban: string) => donorIban === item['IBAN Zahlungsbeteiligter']
        )
      );
      if (!donor) return; //TODO: show error
      addDonation.mutate(
        {
          data: {
            amount: parseFloat(item['Betrag'].replaceAll(',', '.')),
            date: transformCsvDateString(item['Buchungstag']),
            note: item['Verwendungszweck'],
            donor: donor.id,
          },
        },
        {
          onSuccess: () => {
            if (index === dataWithoutSkippedDonors.length - 1) {
              setIsLoading(false);
              notifications.show({
                title: 'Erfolg',
                message: 'Import erfolgreich abgeschlossen',
              });
              queryClient.invalidateQueries({
                queryKey: ['donations'],
              });
              onClose();
            }
          },
        }
      );
    });
  };

  const newDonors = useMemo(() => {
    const nd: CsvLine[] = [];
    dataWithoutSkippedDonors?.forEach((item) => {
      const donor = donors.data?.find((d) =>
        d.attributes.ibans.some(
          (donorIban: string) => donorIban === item['IBAN Zahlungsbeteiligter']
        )
      );
      if (!donor) {
        nd.push(item);
      }
    });
    return filterDuplicatesByAttribute(nd, 'IBAN Zahlungsbeteiligter');
  }, [donors.data, parsedData?.data, donorsToSkip]);

  const firstDonorData = useMemo(
    () => (newDonors?.[0] ? getListItemDonorFromCsvLine(newDonors[0]) : undefined),
    [newDonors]
  );

  const active = useMemo(() => {
    if (parsedData === undefined) {
      return 0;
    }
    if (newDonors.length > 0) {
      return 1;
    }
    return 2;
  }, [newDonors, parsedData]);

  const onSkipDonor = () => {
    if (firstDonorData?.attributes.ibans[0] === undefined) return;
    setDonorsToSkip((value) => [
      ...value,
      (firstDonorData.attributes.ibans[0] + firstDonorData.attributes.note) as string,
    ]);
  };

  return (
    <Stepper
      active={active}
      onStepClick={() => {}}
      h={active === 1 && newDonors.length > 0 ? '100%' : 300}
    >
      <Stepper.Step label="CSV Upload" description="Laden Sie die CSV Datei hoch">
        <CsvDropzone setParsedData={uploadData} />
      </Stepper.Step>
      <Stepper.Step label="Neue Spender" description="Legen Sie die neuen Spender an">
        {firstDonorData !== undefined && (
          <DonorDataCreation data={firstDonorData} onCancel={onSkipDonor} />
        )}
      </Stepper.Step>
      <Stepper.Step label="CSV Import" description="Importieren Sie die CSV Daten">
        <DataImport
          onConfirm={addDonations}
          onClose={onClose}
          isLoading={isLoading}
          noData={dataWithoutSkippedDonors?.length === 0}
        />
      </Stepper.Step>
    </Stepper>
  );
}
