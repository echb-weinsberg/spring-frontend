import { ModalProps, Modal } from '@mantine/core';

import { ImportStepper } from '../ImportStepper/ImportStepper';

export function CsvImportModal({ ...props }: ModalProps) {
  return (
    <Modal size={1000} {...props} closeOnClickOutside={false}>
      <ImportStepper onClose={props.onClose} />
    </Modal>
  );
}
