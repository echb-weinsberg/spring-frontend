import { CsvLine, parseFile } from '@/csvImport/csvImport';
import { Group, Text, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconFileSpreadsheet, IconUpload, IconX } from '@tabler/icons-react';
import { ParseResult } from 'papaparse';

export function CsvDropzone({
  setParsedData,
}: {
  setParsedData: (parsedData: ParseResult<CsvLine>) => void;
}) {
  return (
    <Dropzone
      onDrop={(files) => parseFile(files[0], setParsedData)}
      maxSize={5 * 1024 ** 2}
      accept={[MIME_TYPES.csv]}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileSpreadsheet
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="sm" c="dimmed" inline mt={7}>
            Ziehe CSV-Datei hierher oder klicke, um Datei auszuwählen
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
