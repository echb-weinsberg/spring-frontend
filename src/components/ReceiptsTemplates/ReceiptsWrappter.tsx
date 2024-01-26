import { useReceiptTemplates } from '@/api/queries/receiptTemplates';
import { Receipts } from './Receipts';

export function ReceiptsWrappter() {
  const receiptTemplates = useReceiptTemplates();
  if (!receiptTemplates.data?.[0]) return null;
  const { single, collection } = receiptTemplates.data[0].attributes.templateStructure;
  if (!single || !collection) return null;
  return (
    <Receipts collection={collection} single={single} templateId={receiptTemplates.data[0].id} />
  );
}
