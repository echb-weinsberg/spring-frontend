import { ListItemDonation } from '@/api/queries/donations';
import { ListItemDonor } from '@/api/queries/donors';

export const mockDonor: ListItemDonor = {
  id: 1,
  attributes: {
    name: 'Max',
    surname: 'Mustermann',
    street: 'Musterstraße 1',
    plz: '12345',
    city: 'Musterstadt',
    country: 'Deutschland',
    title: 'mr',
    wantReceipt: true,
  },
};

export const mockDonations: ListItemDonation[] = [
  {
    id: 1,
    attributes: {
      donor: {
        data: {
          id: 1,
          attributes: {
            name: 'Max',
            surname: 'Mustermann',
          },
        },
      },
      note: 'Testnote',
      amount: 100,
      date: '2022-04-12',
    },
  },
  {
    id: 2,
    attributes: {
      donor: {
        data: {
          id: 1,
          attributes: {
            name: 'Max',
            surname: 'Mustermann',
          },
        },
      },
      note: 'Testnote',
      amount: 111.11,
      date: '2022-05-13',
    },
  },
];
