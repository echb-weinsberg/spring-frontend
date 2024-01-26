import { Flex, NumberInput } from '@mantine/core';
import { BlockWrapper } from './BlockWrapper';
import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';
import {
  DEFAULT_DIVIDER_HEIGHT,
  DEFAULT_DIVIDER_WIDTH,
  SpringDividerElement,
} from '../SpringDivider';

export function DividerBlock({
  element,
  dispatchContents,
  index,
  section,
  isLastItem,
}: {
  element: SpringDividerElement;
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  section: Section;
  isLastItem: boolean;
}) {
  return (
    <BlockWrapper
      title="Trennlinie"
      dispatchContents={dispatchContents}
      index={index}
      section={section}
      isLastItem={isLastItem}
    >
      <Flex gap="sm">
        <NumberInput
          label="Höhe"
          value={element.height ?? DEFAULT_DIVIDER_HEIGHT}
          max={20}
          onChange={(e) => {
            if (typeof e === 'number' && e > 20) return;
            dispatchContents({
              type: 'editEntry',
              payload: {
                section,
                element: {
                  ...element,
                  height: typeof e === 'number' ? e : DEFAULT_DIVIDER_HEIGHT,
                },
                index,
              },
            });
          }}
        />
        <NumberInput
          label="Breite"
          value={element.width ?? DEFAULT_DIVIDER_WIDTH}
          max={100}
          suffix="%"
          onChange={(e) => {
            if (typeof e === 'number' && e > 100) return;
            dispatchContents({
              type: 'editEntry',
              payload: {
                section,
                element: {
                  ...element,
                  width: typeof e === 'number' ? e : DEFAULT_DIVIDER_WIDTH,
                },
                index,
              },
            });
          }}
        />
      </Flex>
    </BlockWrapper>
  );
}
