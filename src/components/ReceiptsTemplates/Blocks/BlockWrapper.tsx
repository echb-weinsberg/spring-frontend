import { ActionIcon, CloseButton, Fieldset, Flex } from '@mantine/core';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { ContentsAction, Section } from '../hooks/useReceiptStructureReducer';

export function BlockWrapper({
  children,
  title,
  dispatchContents,
  index,
  isLastItem,
  section,
}: {
  children?: React.ReactNode;
  title: string;
  dispatchContents: React.Dispatch<ContentsAction>;
  index: number;
  isLastItem: boolean;
  section: Section;
}) {
  const onClose = () => dispatchContents({ type: 'deleteEntry', payload: { section, index } });
  const onMoveUp = () =>
    dispatchContents({ type: 'moveEntry', payload: { section, index, direction: 'up' } });

  const onMoveDown = () =>
    dispatchContents({ type: 'moveEntry', payload: { section, index, direction: 'down' } });

  return (
    <Flex gap="xs" mb={30}>
      <Fieldset legend={title} style={{ flex: 1 }}>
        {children}
      </Fieldset>
      <Flex direction={'column'} gap="xs">
        <CloseButton onClick={onClose} />
        <Flex direction={'column'}>
          {index !== 0 && (
            <ActionIcon variant="subtle" onClick={onMoveUp}>
              <IconArrowUp size="16" color="grey" />
            </ActionIcon>
          )}
          {!isLastItem && (
            <ActionIcon variant="subtle" onClick={onMoveDown}>
              <IconArrowDown size="16" color="grey" />
            </ActionIcon>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
