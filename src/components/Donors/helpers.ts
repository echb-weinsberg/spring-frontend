import { useAddDonor, useUpdateDonor } from '@/api/queries/donors';
import { DonorRequestDataTitleEnum } from '@/generated';
import { DonorFormValues } from './DonorForm';
import { notifications } from '@mantine/notifications';
import { useLoggedInUser } from '@/api/queries/users';
import { useState } from 'react';

export function useAddDonorWithFormValues(successCallback?: () => void) {
  const loggedInUser = useLoggedInUser();
  const updateDonor = useUpdateDonor();
  const addDonor = useAddDonor();
  const [isLoading, setIsLoading] = useState(false);

  const mutateDonor = (formValues: DonorFormValues, donorToUpdate?: number) => {
    setIsLoading(true);
    const payload = {
      title: (formValues.title as DonorRequestDataTitleEnum) ?? undefined,
      name: formValues.name,
      surname: formValues.surname,
      email: formValues.email,
      street: formValues.street,
      plz: formValues.plz,
      city: formValues.city,
      country: formValues.country,
      mandateNumber: formValues.mandateNumber,
      ibans: formValues.ibans,
      wantReceipt: formValues.wantsReceipt === 'true',
      note: formValues.note,
      organisation: loggedInUser.data?.organisation?.id,
    };
    if (donorToUpdate !== undefined) {
      updateDonor.mutate(
        [
          donorToUpdate,
          {
            data: payload,
          },
        ],
        {
          onSuccess: () => {
            setIsLoading(false);
            notifications.show({
              title: 'Erfolg',
              message: 'Spender wurde erfolgreich aktualisiert',
            });
            if (successCallback) successCallback();
          },
          onError: () => {
            setIsLoading(false);
            notifications.show({
              title: 'Fehler',
              message: 'Spender konnte nicht aktualisiert werden',
            });
          },
        }
      );
    } else {
      addDonor.mutate(
        {
          data: payload,
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            notifications.show({
              title: 'Erfolg',
              message: 'Spender wurde erfolgreich angelegt',
            });
            if (successCallback) successCallback();
          },
          onError: () => {
            setIsLoading(false);
            notifications.show({
              title: 'Fehler',
              message: 'Spender konnte nicht angelegt werden',
            });
          },
        }
      );
    }
  };

  return { mutateDonor, isLoading };
}
