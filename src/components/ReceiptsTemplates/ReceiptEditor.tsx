import { Box, Button, Center, Menu } from '@mantine/core';
import { SpringElement } from './ReceiptPDF';
import { ContentsAction, Section } from './hooks/useReceiptStructureReducer';
import { TextBlock } from './Blocks/TextBlock';
import { SpaceBlock } from './Blocks/SpaceBlock';
import { DividerBlock } from './Blocks/DividerBlock';
import { IconPlus } from '@tabler/icons-react';
import { ImageBlock } from './Blocks/ImageBlock';
import { SignatureBlock } from './Blocks/SignatureBlock';
import { AddressBlock } from './Blocks/AddressBlock';
import { DonationsTableBlock } from './Blocks/DonationsTableBlock';

type ReceiptEditorProps = {
  contents: SpringElement[];
  dispatchContents: React.Dispatch<ContentsAction>;
  section: Section;
};

export function ReceiptEditor({ contents, dispatchContents, section }: ReceiptEditorProps) {
  const getSpringBlock = (element: SpringElement, index: number) => {
    switch (element.type) {
      case 'text':
        return (
          <TextBlock
            element={element.element}
            dispatchContents={dispatchContents}
            index={index}
            section={section}
            isLastItem={index === contents.length - 1}
          />
        );
      case 'image':
        return (
          <ImageBlock
            element={element.element}
            dispatchContents={dispatchContents}
            index={index}
            section={section}
            isLastItem={index === contents.length - 1}
          />
        );
      case 'space':
        return (
          <SpaceBlock
            element={element.element}
            dispatchContents={dispatchContents}
            index={index}
            section={section}
            isLastItem={index === contents.length - 1}
          />
        );
      case 'divider':
        return (
          <DividerBlock
            element={element.element}
            dispatchContents={dispatchContents}
            index={index}
            section={section}
            isLastItem={index === contents.length - 1}
          />
        );
      case 'signature':
        return (
          <SignatureBlock
            element={element.element}
            dispatchContents={dispatchContents}
            index={index}
            section={section}
            isLastItem={index === contents.length - 1}
          />
        );
      case 'address':
        return (
          <AddressBlock
            element={element.element}
            dispatchContents={dispatchContents}
            index={index}
            section={section}
            isLastItem={index === contents.length - 1}
          />
        );
      case 'donationsTable':
        return (
          <DonationsTableBlock
            dispatchContents={dispatchContents}
            index={index}
            section={section}
            isLastItem={index === contents.length - 1}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Box style={{ flex: 1, height: '600px', overflow: 'auto' }} bg="#f8f9fa" p="lg">
      {contents.map(getSpringBlock)}
      <Center>
        <Menu>
          <Menu.Target>
            <Button leftSection={<IconPlus size="16" />}>Element hinzufügen</Button>
          </Menu.Target>
          <Menu.Dropdown>
            {section === 'header' && (
              <Menu.Item
                onClick={() =>
                  dispatchContents({
                    type: 'addEntry',
                    payload: { section, type: 'image' },
                  })
                }
              >
                Logo
              </Menu.Item>
            )}
            {section === 'attachement' && (
              <Menu.Item
                onClick={() =>
                  dispatchContents({
                    type: 'addEntry',
                    payload: { section, type: 'donationsTable' },
                  })
                }
              >
                Spendentabelle
              </Menu.Item>
            )}
            {section === 'address' && (
              <Menu.Item
                onClick={() =>
                  dispatchContents({
                    type: 'addEntry',
                    payload: { section, type: 'address' },
                  })
                }
              >
                Spender Adresse
              </Menu.Item>
            )}
            {section === 'footer' && (
              <Menu.Item
                onClick={() =>
                  dispatchContents({
                    type: 'addEntry',
                    payload: { section, type: 'signature' },
                  })
                }
              >
                Signatur Zeile
              </Menu.Item>
            )}
            <Menu.Item
              onClick={() =>
                dispatchContents({ type: 'addEntry', payload: { section, type: 'text' } })
              }
            >
              Text
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                dispatchContents({
                  type: 'addEntry',
                  payload: { section, type: 'space' },
                })
              }
            >
              Abstand
            </Menu.Item>
            {section !== 'address' && (
              <Menu.Item
                onClick={() =>
                  dispatchContents({
                    type: 'addEntry',
                    payload: { section, type: 'divider' },
                  })
                }
              >
                Trennlinie
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Center>
    </Box>
  );
}
