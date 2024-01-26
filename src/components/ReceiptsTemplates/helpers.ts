import { ListItemDonor } from '@/api/queries/donors';
import { formatToEuro } from '../Donations/helpers';
import { capitalizeFirstLetter } from '../PDF/helpers';
import { NumberToWordsGerman } from '../PDF/numberToWords';
import { ListItemDonation } from '@/api/queries/donations';

export function getDonorAddress(donor: ListItemDonor) {
  return `${donor?.attributes.surname ? `${donor.attributes.surname} ` : ''}${donor?.attributes.name}, ${donor.attributes.street}, ${donor?.attributes.plz} ${donor?.attributes.city}${donor?.attributes.country?.length && donor.attributes.country !== 'Deutschland' ? `, ${donor?.attributes.country}` : ''}`;
}

export function getDonationSumEuro(donorsDonations: ListItemDonation[]) {
  const sum = donorsDonations.reduce((acc, donation) => acc + (donation.attributes.amount ?? 0), 0);
  return formatToEuro(sum);
}

export function getDonationSumWritten(donorsDonations: ListItemDonation[]) {
  const converter = new NumberToWordsGerman();
  const sum = donorsDonations.reduce((acc, donation) => acc + (donation.attributes.amount ?? 0), 0);
  return capitalizeFirstLetter(converter.numberToWord(sum));
}

export function getCurrentDate() {
  return new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function getDateOfFirstDonation(donation: ListItemDonation[]) {
  if (!donation[0]?.attributes.date?.length) return '';
  return new Date(donation[0].attributes.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function getReplaceVars(
  donor: ListItemDonor,
  year: string,
  donorsDonations: ListItemDonation[]
) {
  const replaceVars = (content: string) =>
    content
      .replaceAll('{{donorAddress}}', getDonorAddress(donor))
      .replaceAll('{{donationSumEuro}}', getDonationSumEuro(donorsDonations))
      .replaceAll('{{donationSumWritten}}', getDonationSumWritten(donorsDonations))
      .replaceAll('{{date}}', getCurrentDate())
      .replaceAll('{{year}}', year)
      .replaceAll('{{dateFirstDonation}}', getDateOfFirstDonation(donorsDonations));

  return { replaceVars };
}
