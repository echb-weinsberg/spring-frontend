import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';
import { BlockWrapper } from './BlockWrapper';

export function DonationsTableBlock({
  dispatchContents,
  index,
  section,
  isLastItem,
}: {
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  section: Section;
  isLastItem: boolean;
}) {
  return (
    <BlockWrapper
      title="Spendentabelle"
      dispatchContents={dispatchContents}
      index={index}
      section={section}
      isLastItem={isLastItem}
    />
  );
}
