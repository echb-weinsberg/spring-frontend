import { Center, Box, SegmentedControl, Text, Flex, NumberInput } from '@mantine/core';
import { IconAlignLeft, IconAlignCenter, IconAlignRight } from '@tabler/icons-react';
import { DEFAULT_IMAGE_SIZE, ImagePosition, SpringImageElement } from '../SpringImage';
import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';
import { BlockWrapper } from './BlockWrapper';

export function ImageBlock({
  element,
  dispatchContents,
  index,
  section,
  isLastItem,
}: {
  element: SpringImageElement;
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  section: Section;
  isLastItem: boolean;
}) {
  return (
    <BlockWrapper
      title="Logo"
      dispatchContents={dispatchContents}
      index={index}
      section={section}
      isLastItem={isLastItem}
    >
      <Flex gap="sm">
        <NumberInput
          label="Schriftgröße"
          value={element.size ?? DEFAULT_IMAGE_SIZE}
          max={200}
          onChange={(e) => {
            if (typeof e === 'number' && e > 200) return;
            dispatchContents({
              type: 'editEntry',
              payload: {
                section,
                element: {
                  ...element,
                  size: typeof e === 'number' ? e : DEFAULT_IMAGE_SIZE,
                },
                index,
              },
            });
          }}
        />
        <Center>
          <Box>
            <Text size="sm" fw={500} pb="4">
              Ausrichtung
            </Text>
            <SegmentedControl
              size="xs"
              data={
                [
                  { value: 'flex-start', label: <IconAlignLeft size="16" /> },
                  { value: 'center', label: <IconAlignCenter size="16" /> },
                  { value: 'flex-end', label: <IconAlignRight size="16" /> },
                ] as const
              }
              value={element.position ?? 'flex-start'}
              onChange={(e) => {
                dispatchContents({
                  type: 'editEntry',
                  payload: {
                    section,
                    element: { ...element, position: e as ImagePosition },
                    index,
                  },
                });
              }}
            />
          </Box>
        </Center>
      </Flex>
    </BlockWrapper>
  );
}
