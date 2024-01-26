import { ListItemDonation } from '@/api/queries/donations';
import { ListItemDonor } from '@/api/queries/donors';
import { Document } from '@react-pdf/renderer';
import { Contents, ReceiptPDF } from '../ReceiptsTemplates/ReceiptPDF';

export function PdfDocument({
  donors,
  donations,
  receiptTemplates,
  logoUrl,
}: {
  donors: ListItemDonor[];
  donations: ListItemDonation[];
  receiptTemplates: { single: Contents; collection: Contents };
  logoUrl: string;
}) {
  return (
    <Document>
      {donors
        .filter((donor) => donor.attributes.wantReceipt)
        .map((donor) => {
          const donorsDonations = donations
            .filter((donation) => donation.attributes.donor?.data?.id === donor?.id)
            .sort((a, b) => {
              if (b.attributes.date && a.attributes.date) {
                return (
                  new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime()
                );
              }
              return -1;
            });
          if (!donorsDonations.length) return null;
          const templateType = donorsDonations.length > 1 ? 'collection' : 'single';
          return (
            <ReceiptPDF
              key={donor.id}
              donor={donor}
              donations={donorsDonations}
              contents={
                templateType === 'single' ? receiptTemplates.single : receiptTemplates.collection
              }
              templateType={templateType}
              logoUrl={logoUrl}
            />
          );
        })}
    </Document>
  );
}
