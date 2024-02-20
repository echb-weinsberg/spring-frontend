import { ListItemDonor } from '@/api/queries/donors';

import { Modal, ModalProps } from '@mantine/core';

import { DonorForm, DonorFormValues } from './DonorForm';
import { useAddDonorWithFormValues } from './helpers';

type AddDonorModalProps = {
  initialData?: ListItemDonor;
};

export function AddDonorModal({ initialData, ...props }: AddDonorModalProps & ModalProps) {
  const { mutateDonor, isLoading } = useAddDonorWithFormValues(props.onClose);

  const handleSave = (formValues: DonorFormValues) => {
    mutateDonor(formValues, initialData?.id);
  };

  return (
    <Modal size={1000} title="Spender hinzufügen" {...props}>
      <DonorForm
        handleSave={handleSave}
        initialData={initialData}
        onCancel={props.onClose}
        isLoading={isLoading}
      />
    </Modal>
  );
}
