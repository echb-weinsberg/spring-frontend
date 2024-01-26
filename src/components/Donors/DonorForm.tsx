import { ListItemDonor } from '@/api/queries/donors';
import {
  Button,
  Fieldset,
  Flex,
  Grid,
  Group,
  Select,
  TagsInput,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

type DonorFormProps = {
  handleSave: (formValues: DonorFormValues) => void;
  onCancel: () => void;
  initialData?: ListItemDonor;
  cancelButtonTitle?: string;
  saveButtonTitle?: string;
  onValuesChangeCallback?: (formValues: DonorFormValues) => void;
};

export type DonorFormValues = {
  title: string;
  name: string;
  surname: string;
  email: string;
  street: string;
  plz: string;
  city: string;
  country: string;
  ibans: any;
  mandateNumber: string;
  wantsReceipt: string;
  note: string;
};

export function DonorForm({
  handleSave,
  onCancel,
  initialData,
  cancelButtonTitle,
  saveButtonTitle,
  onValuesChangeCallback,
}: DonorFormProps) {
  const form = useForm<DonorFormValues>({
    onValuesChange: (formValues) =>
      onValuesChangeCallback ? onValuesChangeCallback(formValues) : undefined,
    initialValues: {
      title: initialData?.attributes.title ?? '',
      name: initialData?.attributes.name ?? '',
      surname: initialData?.attributes.surname ?? '',
      email: initialData?.attributes.email ?? '',
      street: initialData?.attributes.street ?? '',
      plz: initialData?.attributes.plz ?? '',
      city: initialData?.attributes.city ?? '',
      country: initialData?.attributes.country ?? 'Deutschland',
      ibans: initialData?.attributes.ibans ?? [],
      mandateNumber: initialData?.attributes.mandateNumber ?? '',
      wantsReceipt: initialData?.attributes.wantReceipt?.toString() ?? 'true',
      note: initialData?.attributes.note ?? '',
    },
  });

  useEffect(() => {
    form.setInitialValues({
      title: initialData?.attributes.title ?? '',
      name: initialData?.attributes.name ?? '',
      surname: initialData?.attributes.surname ?? '',
      email: initialData?.attributes.email ?? '',
      street: initialData?.attributes.street ?? '',
      plz: initialData?.attributes.plz ?? '',
      city: initialData?.attributes.city ?? '',
      country: initialData?.attributes.country ?? 'Deutschland',
      ibans: initialData?.attributes.ibans ?? [],
      mandateNumber: initialData?.attributes.mandateNumber ?? '',
      wantsReceipt: initialData?.attributes.wantReceipt?.toString() ?? 'true',
      note: initialData?.attributes.note ?? '',
    });
    form.reset();
  }, [initialData]);

  return (
    <>
      <Fieldset legend="Kontakt">
        <Grid>
          <Grid.Col span={6}>
            <Select
              placeholder="Anrede"
              label="Anrede"
              data={[
                { value: 'mr', label: 'Herr' },
                { value: 'mrs', label: 'Frau' },
                { value: 'mrAndMrs', label: 'Herr und Frau' },
                { value: 'none', label: 'Keine Anrede' },
              ]}
              {...form.getInputProps('title')}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="Vorname" label="Vorname" {...form.getInputProps('surname')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="Nachname" label="Nachname" {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="Email" label="Email" {...form.getInputProps('email')} />
          </Grid.Col>
          <Grid.Col>
            <Textarea label="Bemerkung" placeholder="Bemerkung" {...form.getInputProps('note')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="Straße" label="Straße" {...form.getInputProps('street')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="PLZ" label="PLZ" {...form.getInputProps('plz')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="Stadt" label="Stadt" {...form.getInputProps('city')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="Land" label="Land" {...form.getInputProps('country')} />
          </Grid.Col>
        </Grid>
      </Fieldset>
      <Fieldset legend="Bankverbindung">
        <Grid>
          <Grid.Col span={4}>
            <TagsInput
              placeholder="IBAN eingeben und mit Enter bestätigen"
              label="IBANs"
              {...form.getInputProps('ibans')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              placeholder="Mandatsreferenz"
              label="Mandatsreferenz"
              {...form.getInputProps('mandateNumber')}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              placeholder="Will Spendenbescheinigung"
              label="Will Spendenbescheinigung"
              data={[
                { value: 'true', label: 'Ja' },
                { value: 'false', label: 'Nein' },
              ]}
              defaultValue="true"
              {...form.getInputProps('wantsReceipt')}
            />
          </Grid.Col>
        </Grid>
      </Fieldset>
      <Flex justify={'end'} mt={10}>
        <Group>
          <Button onClick={onCancel}>{cancelButtonTitle ?? 'Abbrechen'}</Button>
          <Button onClick={() => handleSave(form.values)}>{saveButtonTitle ?? 'Speichern'}</Button>
        </Group>
      </Flex>
    </>
  );
}
