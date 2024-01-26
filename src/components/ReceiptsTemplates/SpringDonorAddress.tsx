import { View, Text } from '@react-pdf/renderer';
import { getReadableTitle } from '../PDF/helpers';
import { ListItemDonor } from '@/api/queries/donors';

export type SpringAddressElement = {
  style?: any;
};

export function SpringAddress({
  element,
  donor,
}: {
  element: SpringAddressElement;
  donor: ListItemDonor;
}) {
  return (
    <View style={{ backgroundColor: 'white', fontSize: 11, ...element.style }}>
      <Text>{getReadableTitle(donor.attributes.title ?? 'mr')}</Text>
      <Text>{`${donor?.attributes.surname ? `${donor.attributes.surname} ` : ''}${donor?.attributes.name}`}</Text>
      <Text>{donor?.attributes.street}</Text>
      <Text>{`${donor?.attributes.plz} ${donor?.attributes.city}`}</Text>
      {donor.attributes.country !== 'Deutschland' && <Text>{donor.attributes.country}</Text>}
    </View>
  );
}
