import { Box, Flex, NumberInput, Textarea } from '@mantine/core';
import { DEFAULT_TEXT_FONTSIZE } from '../SpringText';
import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';

import { BlockWrapper } from './BlockWrapper';
import { SpringSignatureElement } from '../SpringSignature';

export function SignatureBlock({
  element,
  dispatchContents,
  index,
  section,
  isLastItem,
}: {
  element: SpringSignatureElement;
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  section: Section;
  isLastItem: boolean;
}) {
  return (
    <BlockWrapper
      title="Signatur"
      dispatchContents={dispatchContents}
      index={index}
      section={section}
      isLastItem={isLastItem}
    >
      <Flex direction="row" gap="sm">
        <Box style={{ flex: 1 }}>
          <Textarea
            label="Inhalt Links Oben"
            autosize
            maxRows={10}
            value={element.contentLeft.contentTop}
            onChange={(e) => {
              dispatchContents({
                type: 'editEntry',
                payload: {
                  section,
                  element: {
                    ...element,
                    contentLeft: { ...element.contentLeft, contentTop: e.target.value },
                  },
                  index,
                },
              });
            }}
            pb="sm"
          />
          <Textarea
            label="Inhalt Links Unten"
            autosize
            maxRows={10}
            value={element.contentLeft.contentBottom}
            onChange={(e) => {
              dispatchContents({
                type: 'editEntry',
                payload: {
                  section,
                  element: {
                    ...element,
                    contentLeft: { ...element.contentLeft, contentBottom: e.target.value },
                  },
                  index,
                },
              });
            }}
            pb="sm"
          />
          <Flex gap="sm">
            <NumberInput
              label="Schriftgröße Links"
              value={element.contentLeft.style?.fontSize ?? DEFAULT_TEXT_FONTSIZE}
              max={20}
              onChange={(e) => {
                if (typeof e === 'number' && e > 20) return;
                dispatchContents({
                  type: 'editEntry',
                  payload: {
                    section,
                    element: {
                      ...element,
                      contentLeft: {
                        ...element.contentLeft,
                        style: {
                          ...element.contentLeft.style,
                          fontSize: typeof e === 'number' ? e : DEFAULT_TEXT_FONTSIZE,
                        },
                      },
                    },
                    index,
                  },
                });
              }}
            />
          </Flex>
        </Box>
        <Box style={{ flex: 1 }}>
          <Textarea
            label="Inhalt Rechts Oben"
            autosize
            maxRows={10}
            value={element.contentRight.contentTop}
            onChange={(e) => {
              dispatchContents({
                type: 'editEntry',
                payload: {
                  section,
                  element: {
                    ...element,
                    contentRight: { ...element.contentRight, contentTop: e.target.value },
                  },
                  index,
                },
              });
            }}
            pb="sm"
          />
          <Textarea
            label="Inhalt Rechts Unten"
            autosize
            maxRows={10}
            value={element.contentRight.contentBottom}
            onChange={(e) => {
              dispatchContents({
                type: 'editEntry',
                payload: {
                  section,
                  element: {
                    ...element,
                    contentRight: { ...element.contentRight, contentBottom: e.target.value },
                  },
                  index,
                },
              });
            }}
            pb="sm"
          />
          <Flex gap="sm">
            <NumberInput
              label="Schriftgröße Rechts"
              value={element.contentRight.style?.fontSize ?? DEFAULT_TEXT_FONTSIZE}
              max={20}
              onChange={(e) => {
                if (typeof e === 'number' && e > 20) return;
                dispatchContents({
                  type: 'editEntry',
                  payload: {
                    section,
                    element: {
                      ...element,
                      contentRight: {
                        ...element.contentRight,
                        style: {
                          ...element.contentRight.style,
                          fontSize: typeof e === 'number' ? e : DEFAULT_TEXT_FONTSIZE,
                        },
                      },
                    },
                    index,
                  },
                });
              }}
            />
          </Flex>
        </Box>
      </Flex>
    </BlockWrapper>
  );
}
