import { NumberInput } from '@mantine/core';
import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';
import { SpringSpaceElement } from '../SpringSpace';
import { BlockWrapper } from './BlockWrapper';

export function SpaceBlock({
  element,
  dispatchContents,
  index,
  section,
  isLastItem,
}: {
  element: SpringSpaceElement;
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  section: Section;
  isLastItem: boolean;
}) {
  return (
    <BlockWrapper
      title="Abstand"
      dispatchContents={dispatchContents}
      index={index}
      section={section}
      isLastItem={isLastItem}
    >
      <NumberInput
        label="Höhe"
        value={element.height ?? 0}
        max={500}
        onChange={(e) => {
          if (typeof e === 'number' && e > 500) return;
          dispatchContents({
            type: 'editEntry',
            payload: {
              section,
              element: {
                ...element,
                height: typeof e === 'number' ? e : 0,
              },
              index,
            },
          });
        }}
      />
    </BlockWrapper>
  );
}
