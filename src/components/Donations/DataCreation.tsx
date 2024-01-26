import { ListItemDonor, useDonors, useUpdateDonor } from '@/api/queries/donors';

import { DonorForm, DonorFormValues } from '../Donors/DonorForm';

import { useAddDonorWithFormValues } from '../Donors/helpers';
import { useMemo, useState } from 'react';
import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

export function DonorDataCreation({
  data,
  onCancel,
}: {
  data: ListItemDonor;
  onCancel: () => void;
}) {
  const donors = useDonors();
  const { mutateDonor } = useAddDonorWithFormValues();
  const updateDonor = useUpdateDonor();
  const [formValues, setFormValues] = useState<DonorFormValues>({
    name: data.attributes.name ?? '',
    surname: data.attributes.surname ?? null,
    street: data.attributes.street ?? null,
    plz: data.attributes.plz ?? null,
    city: data.attributes.city ?? null,
  } as DonorFormValues);

  const handleLinkIbanToDonor = (newIban: string, donor: ListItemDonor) => {
    const newDonor = {
      ibans: [...donor.attributes.ibans, newIban],
    };
    updateDonor.mutate([donor.id, { data: newDonor }], {
      onSuccess: () => {
        notifications.show({
          title: 'Erfolg',
          message: 'IBAN erfolgreich verknüpft',
        });
      },
      onError: () => {
        notifications.show({
          title: 'Fehler',
          message: 'IBAN konnte nicht verknüpft werden',
        });
      },
    });
  };

  const donorProbablyExists = useMemo(
    () =>
      donors.data?.find(
        (donor) =>
          donor.attributes.name === (formValues?.name ?? null) &&
          donor.attributes.surname === (formValues?.surname ?? null) &&
          donor.attributes.street === (formValues?.street ?? null) &&
          donor.attributes.plz === (formValues?.plz ?? null) &&
          donor.attributes.city === (formValues?.city ?? null)
      ),
    [formValues, donors.data]
  );

  const handleDonorSave = (values: DonorFormValues) => {
    if (!donorProbablyExists) {
      mutateDonor(values);
    } else {
      modals.openConfirmModal({
        title: 'Duplikat erkannt',
        children: (
          <Text size="sm">
            Spender mit diesem Namen und dieser Adresse existiert bereits. Wollen Sie die IBAN
            verknüpfen?
          </Text>
        ),
        labels: { confirm: 'Verknüpfen', cancel: 'Als neuen Spender anlegen' },
        onConfirm: () => handleLinkIbanToDonor(values.ibans[0] ?? '', donorProbablyExists),
        cancelProps: {
          variant: 'filled',
        },
      });
    }
  };

  return (
    <DonorForm
      handleSave={handleDonorSave}
      initialData={data}
      onCancel={onCancel}
      cancelButtonTitle="Überspringen"
      onValuesChangeCallback={setFormValues}
    />
  );
}
