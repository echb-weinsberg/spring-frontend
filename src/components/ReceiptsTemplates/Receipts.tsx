import { Box, Button, Flex, Group, Select, Tabs, Text, Title } from '@mantine/core';
import { PDFViewer, Document } from '@react-pdf/renderer';
import { Contents, ReceiptPDF, TemplateType } from './ReceiptPDF';
import { useReceiptStructureReducer } from './hooks/useReceiptStructureReducer';
import { ReceiptEditor } from './ReceiptEditor';
import { useState } from 'react';
import { mockDonations, mockDonor } from './mockData';
import { useUpdateReceiptTemplate } from '@/api/queries/receiptTemplates';
import { notifications } from '@mantine/notifications';
import { useLoggedInUser } from '@/api/queries/users';
import { strapiBasePath } from '@/basePaths';

export function Receipts({
  single,
  collection,
  templateId,
}: {
  single: Contents;
  collection: Contents;
  templateId: number;
}) {
  const loggedInUser = useLoggedInUser();

  const updateReceiptTemplate = useUpdateReceiptTemplate();

  const [collectionContents, dispatchCollectionContents] = useReceiptStructureReducer(collection);
  const [singleContents, dispatchSingleContents] = useReceiptStructureReducer(single);

  const [selectedTemplateType, setSelectedTemplateType] = useState<TemplateType>('single');

  const selectTemplateTypeData = [
    { value: 'single', label: 'Einzelbestätigung' },
    { value: 'collection', label: 'Sammelbestätigung' },
  ];

  const currentContents = selectedTemplateType === 'single' ? singleContents : collectionContents;
  const currentDispatch =
    selectedTemplateType === 'single' ? dispatchSingleContents : dispatchCollectionContents;

  const saveTemplate = () => {
    const payload =
      selectedTemplateType === 'single'
        ? {
            single: currentContents,
            collection,
          }
        : {
            single,
            collection: currentContents,
          };

    updateReceiptTemplate.mutate(
      [
        templateId,
        {
          data: {
            templateStructure: payload,
          },
        },
      ],
      {
        onSuccess: () => {
          notifications.show({
            title: 'Erfolg',
            message: 'Vorlage wurde erfolgreich gespeichert',
          });
        },
        onError: () => {
          notifications.show({
            title: 'Fehler',
            message: 'Vorlage konnte nicht gespeichert werden',
          });
        },
      }
    );
  };

  return (
    <>
      <Flex pb={20} justify={'space-between'}>
        <Title>Vorlagen</Title>
        <Group>
          <Select
            data={selectTemplateTypeData}
            value={selectedTemplateType}
            onChange={(value) => setSelectedTemplateType(value as TemplateType)}
          />
          <Button onClick={saveTemplate}>Speichern</Button>
        </Group>
      </Flex>
      <Flex gap="lg">
        <Tabs defaultValue="header" style={{ flex: 1 }}>
          <Tabs.List>
            <Tabs.Tab value="header">Kopfzeile</Tabs.Tab>
            <Tabs.Tab value="address">Adresse</Tabs.Tab>
            <Tabs.Tab value="body">Inhalt</Tabs.Tab>
            <Tabs.Tab value="footer">Fußzeile</Tabs.Tab>
            {selectedTemplateType === 'collection' && (
              <Tabs.Tab value="attachement">Anlage</Tabs.Tab>
            )}
          </Tabs.List>
          <Tabs.Panel value="header">
            <ReceiptEditor
              contents={currentContents.header}
              dispatchContents={currentDispatch}
              section="header"
            />
          </Tabs.Panel>
          <Tabs.Panel value="address">
            <ReceiptEditor
              contents={currentContents.address}
              dispatchContents={currentDispatch}
              section="address"
            />
          </Tabs.Panel>
          <Tabs.Panel value="body">
            <ReceiptEditor
              contents={currentContents.body}
              dispatchContents={currentDispatch}
              section="body"
            />
          </Tabs.Panel>
          <Tabs.Panel value="footer">
            <ReceiptEditor
              contents={currentContents.footer}
              dispatchContents={currentDispatch}
              section="footer"
            />
          </Tabs.Panel>
          <Tabs.Panel value="attachement">
            <ReceiptEditor
              contents={currentContents.attachement}
              dispatchContents={currentDispatch}
              section="attachement"
            />
          </Tabs.Panel>
        </Tabs>
        <Box style={{ flex: 1, height: '600px' }}>
          <Text size="sm" pb={6} pt={6}>
            Vorschau
          </Text>
          <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
            <Document>
              <ReceiptPDF
                donor={mockDonor}
                donations={mockDonations}
                contents={currentContents}
                templateType={selectedTemplateType}
                logoUrl={`${strapiBasePath.replace('/api', '')}${loggedInUser.data?.organisation.logo?.url}`}
              />
            </Document>
          </PDFViewer>
        </Box>
      </Flex>
    </>
  );
}
