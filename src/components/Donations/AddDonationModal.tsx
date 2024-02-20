import { ListItemDonation, useAddDonation, useUpdateDonation } from '@/api/queries/donations';
import { useDonors } from '@/api/queries/donors';

import {
  Title,
  Grid,
  Modal,
  ModalProps,
  Select,
  TextInput,
  Button,
  Flex,
  NumberInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useState } from 'react';

type AddDonationModalProps = {
  initialData?: ListItemDonation;
};

export function AddDonationModal({ initialData, ...props }: AddDonationModalProps & ModalProps) {
  const addDonation = useAddDonation();
  const updateDonation = useUpdateDonation();
  const donors = useDonors();

  const [isAddingDonation, setIsAddingDonation] = useState(false);

  const form = useForm({
    initialValues: {
      amount: initialData?.attributes.amount ?? 0,
      date: initialData?.attributes.date ? new Date(initialData?.attributes.date) : new Date(),
      note: initialData?.attributes.note ?? '',
      donor: initialData?.attributes.donor?.data?.id?.toString() ?? '',
    },
  });

  const handleSave = () => {
    const payload = {
      amount: form.values.amount,
      note: form.values.note,
      date: dayjs(form.values.date).format('YYYY-MM-DD'),
      donor: form.values.donor,
    };
    setIsAddingDonation(true);
    if (initialData) {
      updateDonation.mutate(
        [
          initialData.id,
          {
            data: payload,
          },
        ],
        {
          onSuccess: () => {
            notifications.show({
              title: 'Erfolg',
              message: 'Spendeneingang wurde erfolgreich aktualisiert',
            });
            form.reset();
            setIsAddingDonation(false);
            props.onClose();
          },
          onError: () => {
            setIsAddingDonation(false);
            notifications.show({
              title: 'Fehler',
              message: 'Spendeneingang konnte nicht aktualisiert werden',
            });
          },
        }
      );
    } else {
      addDonation.mutate(
        {
          data: payload,
        },
        {
          onSuccess: () => {
            notifications.show({
              title: 'Erfolg',
              message: 'Spendeneingang wurde erfolgreich angelegt',
            });
            form.reset();
            setIsAddingDonation(false);
            props.onClose();
          },
          onError: () => {
            setIsAddingDonation(false);
            notifications.show({
              title: 'Fehler',
              message: 'Spendeneingang konnte nicht angelegt werden',
            });
          },
        }
      );
    }
  };

  return (
    <Modal size={1000} {...props}>
      <Grid>
        <Grid.Col>
          <Title order={5}>Details Spendeneingang</Title>
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            placeholder="Betrag"
            label="Betrag"
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            {...form.getInputProps('amount')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DatePickerInput
            label="Datum"
            placeholder="Datum"
            locale="de-DE"
            {...form.getInputProps('date')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            placeholder="Spender"
            label="Spender"
            data={donors.data?.map((donor) => ({
              value: donor.id.toString(),
              label: `${donor.attributes.name}, ${donor.attributes.surname}`,
            }))}
            searchable
            {...form.getInputProps('donor')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            placeholder="Verwendungszweck"
            label="Verwendungszweck"
            {...form.getInputProps('note')}
          />
        </Grid.Col>
        <Grid.Col>
          <Flex justify={'end'}>
            <Button loading={isAddingDonation} onClick={handleSave}>
              Speichern
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
