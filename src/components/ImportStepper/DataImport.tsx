import { Center, Flex, LoadingOverlay, Button, Text } from '@mantine/core';
import { IconCircleCheck, IconDatabaseImport } from '@tabler/icons-react';

type DataImportProps = {
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
  noData: boolean;
};

export function DataImport({ onConfirm, isLoading, noData, onClose }: DataImportProps) {
  return (
    <Center>
      <Flex direction={'column'} gap={10}>
        <Flex p={50}>
          <IconCircleCheck color="#4BB543" size={100} />
          <Center>
            <Text size="xl">Alle Spender sind in der Datenbank angelegt!</Text>
          </Center>
        </Flex>
        <LoadingOverlay visible={isLoading} />
        {noData ? (
          <Button onClick={onClose}>Schließen</Button>
        ) : (
          <Button leftSection={<IconDatabaseImport />} onClick={onConfirm}>
            Import der Spendeneinträge starten
          </Button>
        )}
      </Flex>
    </Center>
  );
}
