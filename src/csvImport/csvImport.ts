import { FileWithPath } from '@mantine/dropzone';
import Papa from 'papaparse';

export type CsvLine = {
  'Bezeichnung Auftragskonto': string;
  'IBAN Auftragskonto': string;
  'BIC Auftragskonto': string;
  'Bankname Auftragskonto': string;
  Buchungstag: string;
  Valutadatum: string;
  'Name Zahlungsbeteiligter': string;
  'IBAN Zahlungsbeteiligter': string;
  'BIC (SWIFT-Code) Zahlungsbeteiligter': string;
  Buchungstext: string;
  Verwendungszweck: string;
  Betrag: string;
  Waehrung: string;
  'Saldo nach Buchung': string;
  Bemerkung: string;
  Kategorie: string;
  Steuerrelevant: string;
  'Glaeubiger ID': string;
  Mandatsreferenz: string;
};

export function parseFile(
  file: FileWithPath,
  onComplete: (parsedData: Papa.ParseResult<CsvLine>) => void
) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      onComplete(results as Papa.ParseResult<CsvLine>);
    },
  });
}
