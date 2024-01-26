import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ListItemDonor } from '@/api/queries/donors';
import { CsvLine } from '@/csvImport/csvImport';
import { pdf } from '@react-pdf/renderer';

export function formatToEuro(amount: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function transformCsvDateString(inputDateString: string) {
  dayjs.extend(customParseFormat);
  const parsedDate = dayjs(inputDateString, 'DD.MM.YYYY');
  const formattedDate = parsedDate.format('YYYY-MM-DD');
  return formattedDate;
}

export function filterDuplicatesByAttribute(array: CsvLine[], attribute: keyof CsvLine): CsvLine[] {
  const uniqueValues: any[] = [];
  const result = array.filter((item) => {
    if (uniqueValues.indexOf(item[attribute]) === -1) {
      uniqueValues.push(item[attribute]);
      return true;
    }
    return false;
  });

  return result;
}

export function getListItemDonorFromCsvLine(data: CsvLine): ListItemDonor {
  if (!data['Name Zahlungsbeteiligter']) {
    return {
      id: 0,
      attributes: {
        title: 'mr',
        name: '',
        surname: '',
        street: '',
        plz: '',
        city: '',
        country: 'Deutschland',
        wantReceipt: true,
        ibans: [],
        mandateNumber: '',
        note: '',
        email: '',
      },
    };
  }
  const splittedName = data['Name Zahlungsbeteiligter'].split(' ');
  const lastName = splittedName.pop();
  const title = splittedName.length > 1 ? 'mrAndMrs' : 'mr';
  const surname = splittedName.join(' ');
  return {
    id: 0,
    attributes: {
      title,
      name: lastName ?? '',
      surname,
      street: '',
      plz: '',
      city: '',
      country: 'Deutschland',
      wantReceipt: true,
      ibans: [data['IBAN Zahlungsbeteiligter']],
      mandateNumber: data['Mandatsreferenz'],
      note: data['Verwendungszweck'],
      email: '',
    },
  };
}

export const downloadPdf = async (pdfComponent: JSX.Element) => {
  const blobPdf = await pdf(pdfComponent).toBlob();

  const url = URL.createObjectURL(blobPdf);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'Spendenbescheinigungen.pdf';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export function sortByName(a: ListItemDonor, b: ListItemDonor) {
  const nameA = (a.attributes.name ?? '').toUpperCase();
  const nameB = (b.attributes.name ?? '').toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}
