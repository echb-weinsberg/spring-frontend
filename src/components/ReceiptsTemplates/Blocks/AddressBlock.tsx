import { NumberInput } from '@mantine/core';
import { DEFAULT_TEXT_FONTSIZE } from '../SpringText';
import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';
import { BlockWrapper } from './BlockWrapper';
import { SpringAddressElement } from '../SpringDonorAddress';

export function AddressBlock({
  element,
  dispatchContents,
  index,
  section,
  isLastItem,
}: {
  element: SpringAddressElement;
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  section: Section;
  isLastItem: boolean;
}) {
  return (
    <BlockWrapper
      title="Spender Adresse"
      dispatchContents={dispatchContents}
      index={index}
      section={section}
      isLastItem={isLastItem}
    >
      <NumberInput
        label="Schriftgröße"
        value={element.style.fontSize ?? DEFAULT_TEXT_FONTSIZE}
        onChange={(e) => {
          dispatchContents({
            type: 'editEntry',
            payload: {
              section,
              element: {
                ...element,
                style: { ...element.style, fontSize: e },
              },
              index,
            },
          });
        }}
        pb="sm"
      />
    </BlockWrapper>
  );
}
