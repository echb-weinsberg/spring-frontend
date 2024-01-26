import {
  Flex,
  Text,
  NumberInput,
  SegmentedControl,
  Textarea,
  Box,
  Center,
  ActionIcon,
} from '@mantine/core';
import { DEFAULT_TEXT_FONTSIZE, SpringTextElement } from '../SpringText';
import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconBoldOff,
  IconItalic,
} from '@tabler/icons-react';
import { BlockWrapper } from './BlockWrapper';

export function TextBlock({
  element,
  dispatchContents,
  index,
  section,
  isLastItem,
}: {
  element: SpringTextElement;
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  section: Section;
  isLastItem: boolean;
}) {
  const isBold = ['Helvetica-Bold', 'Helvetica-BoldOblique'].includes(element.style?.fontFamily);
  const isItalic = ['Helvetica-Oblique', 'Helvetica-BoldOblique'].includes(
    element.style?.fontFamily
  );

  return (
    <BlockWrapper
      title="Text"
      dispatchContents={dispatchContents}
      index={index}
      section={section}
      isLastItem={isLastItem}
    >
      <Textarea
        label="Inhalt"
        autosize
        maxRows={10}
        value={element.content}
        onChange={(e) => {
          dispatchContents({
            type: 'editEntry',
            payload: { section, element: { ...element, content: e.target.value }, index },
          });
        }}
        pb="sm"
      />
      <Flex gap="sm">
        <NumberInput
          label="Schriftgröße"
          value={element.style?.fontSize ?? DEFAULT_TEXT_FONTSIZE}
          max={20}
          onChange={(e) => {
            if (typeof e === 'number' && e > 20) return;
            dispatchContents({
              type: 'editEntry',
              payload: {
                section,
                element: {
                  ...element,
                  style: {
                    ...element.style,
                    fontSize: typeof e === 'number' ? e : DEFAULT_TEXT_FONTSIZE,
                  },
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
              data={[
                { value: 'left', label: <IconAlignLeft size="16" /> },
                { value: 'center', label: <IconAlignCenter size="16" /> },
                { value: 'right', label: <IconAlignRight size="16" /> },
              ]}
              value={element.style?.textAlign ?? 'left'}
              onChange={(e) => {
                dispatchContents({
                  type: 'editEntry',
                  payload: {
                    section,
                    element: { ...element, style: { ...element.style, textAlign: e } },
                    index,
                  },
                });
              }}
            />
          </Box>
        </Center>
        <Box>
          <Text size="sm" fw={500} pb="4">
            Textstil
          </Text>
          <ActionIcon.Group>
            <ActionIcon
              variant={isBold ? 'filled' : 'default'}
              size="lg"
              aria-label="Gallery"
              onClick={() => {
                dispatchContents({
                  type: 'editEntry',
                  payload: {
                    section,
                    element: {
                      ...element,
                      style: {
                        ...element.style,
                        fontFamily: isBold
                          ? isItalic
                            ? 'Helvetica-Oblique'
                            : 'Helvetica'
                          : isItalic
                            ? 'Helvetica-BoldOblique'
                            : 'Helvetica-Bold',
                      },
                    },
                    index,
                  },
                });
              }}
            >
              {isBold ? <IconBold size="16" /> : <IconBoldOff size="16" />}
            </ActionIcon>
            <ActionIcon
              variant={isItalic ? 'filled' : 'default'}
              size="lg"
              aria-label="Gallery"
              onClick={() => {
                dispatchContents({
                  type: 'editEntry',
                  payload: {
                    section,
                    element: {
                      ...element,
                      style: {
                        ...element.style,
                        fontFamily: isItalic
                          ? isBold
                            ? 'Helvetica-Bold'
                            : 'Helvetica'
                          : isBold
                            ? 'Helvetica-BoldOblique'
                            : 'Helvetica-Oblique',
                      },
                    },
                    index,
                  },
                });
              }}
            >
              {<IconItalic size="16" />}
            </ActionIcon>
          </ActionIcon.Group>
        </Box>
      </Flex>
    </BlockWrapper>
  );
}
