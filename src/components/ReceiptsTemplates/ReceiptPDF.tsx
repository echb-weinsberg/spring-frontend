import { Page, View } from '@react-pdf/renderer';
import { SpringText, SpringTextElement } from './SpringText';
import { SpringSpace, SpringSpaceElement } from './SpringSpace';
import { SpringAddress, SpringAddressElement } from './SpringDonorAddress';
import { ListItemDonor } from '@/api/queries/donors';
import { SpringImage, SpringImageElement } from './SpringImage';
import { ListItemDonation } from '@/api/queries/donations';
import { useAtom } from 'jotai';
import { currentYearAtom } from '@/state';
import { SpringDivider, SpringDividerElement } from './SpringDivider';
import { SpringSignature, SpringSignatureElement } from './SpringSignature';
import { getReplaceVars } from './helpers';
import { SpringDonationsTable, SpringDonationsTableElement } from './SpringDonationsTable';

export type TemplateType = 'single' | 'collection';

export type SpringElement =
  | { type: 'text'; element: SpringTextElement }
  | { type: 'image'; element: SpringImageElement }
  | { type: 'space'; element: SpringSpaceElement }
  | { type: 'divider'; element: SpringDividerElement }
  | { type: 'address'; element: SpringAddressElement }
  | { type: 'signature'; element: SpringSignatureElement }
  | { type: 'donationsTable'; element: SpringDonationsTableElement };

export type Contents = {
  header: SpringElement[];
  address: SpringElement[];
  body: SpringElement[];
  footer: SpringElement[];
  attachement: SpringElement[];
};

export function ReceiptPDF({
  donor,
  donations,
  contents,
  templateType,
  logoUrl,
}: {
  donor: ListItemDonor;
  donations: ListItemDonation[];
  contents: Contents;
  templateType: TemplateType;
  logoUrl: string;
}) {
  //eslint-disable-next-line no-console
  console.log(logoUrl);
  const [year] = useAtom(currentYearAtom);

  if (!donor || !donations) return null;

  const baseConfig = { paddingTop: 60, paddingLeft: 80, paddingRight: 80, paddingBottom: 20 };

  const { replaceVars } = getReplaceVars(donor, year, donations);

  const getElement = (element: SpringElement) => {
    const elementCopy = element;
    switch (elementCopy.type) {
      case 'text':
        return <SpringText element={elementCopy.element} replaceVars={replaceVars} />;
      case 'image':
        return <SpringImage element={elementCopy.element} url={logoUrl} />;
      case 'space':
        return <SpringSpace element={elementCopy.element} />;
      case 'address':
        return <SpringAddress element={elementCopy.element} donor={donor} />;
      case 'divider':
        return <SpringDivider element={elementCopy.element} />;
      case 'signature':
        return <SpringSignature element={elementCopy.element} replaceVars={replaceVars} />;
      case 'donationsTable':
        return <SpringDonationsTable donations={donations} />;
      default:
        return null;
    }
  };
  return (
    <>
      <Page style={baseConfig}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <View>
            {contents.header.map(getElement)}
            {contents.address.map(getElement)}
            {contents.body.map(getElement)}
          </View>
          <View>{contents.footer.map(getElement)}</View>
        </View>
      </Page>
      {templateType === 'collection' && (
        <Page style={baseConfig}>{contents.attachement.map(getElement)}</Page>
      )}
    </>
  );
}
