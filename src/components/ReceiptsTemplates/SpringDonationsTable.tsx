import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ListItemDonation } from '@/api/queries/donations';
import { formatToEuro } from '../Donations/helpers';

export type SpringDonationsTableElement = {
  style?: any;
};

const styles = StyleSheet.create({
  tableRow: { flexDirection: 'row', gap: 0, justifyContent: 'flex-start' },
  tableCell: {
    flexGrow: 1,
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    padding: 5,
    fontSize: 10,
  },
  tableCellEnd: {
    flexGrow: 1,
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    padding: 5,
    fontSize: 10,
  },
  tableCellBottom: {
    flexGrow: 1,
    borderBottom: '1px solid black',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    padding: 5,
    fontSize: 10,
  },
  tableCellBottomEnd: { flexGrow: 1, border: '1px solid black', padding: 5, fontSize: 10 },
});

export function SpringDonationsTable({ donations }: { donations: ListItemDonation[] }) {
  const sum = donations.reduce((acc, donation) => acc + (donation.attributes.amount ?? 0), 0);

  return (
    <View>
      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCell, fontSize: 9, width: '14%' }}>
          <Text>Datum der</Text>
          <Text>Zuwendung</Text>
        </View>
        <View style={{ ...styles.tableCell, fontSize: 9, width: '31%' }}>
          <Text>Art der Zuwendung</Text>
          <Text>(Geldzuwendung/Mitgliedsbeitrag)</Text>
        </View>
        <View style={{ ...styles.tableCell, fontSize: 9, width: '25%' }}>
          <Text>Verzicht auf die Erstattung</Text>
          <Text>von Aufwendungen (ja/nein)</Text>
        </View>
        <View
          style={{
            ...styles.tableCellEnd,
            fontSize: 9,
            width: '10%',
            alignItems: 'flex-end',
          }}
        >
          <Text>Betrag</Text>
        </View>
      </View>

      {donations.map((donation) => (
        <View style={styles.tableRow} key={donation.id}>
          <View style={{ ...styles.tableCell, width: '14%' }}>
            <Text>
              {new Date(donation.attributes.date ?? '').toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View style={{ ...styles.tableCell, width: '31%' }}>
            <Text>Geldzuwendung</Text>
          </View>
          <View style={{ ...styles.tableCell, width: '25%' }}>
            <Text>nein</Text>
          </View>
          <View style={{ ...styles.tableCellEnd, width: '10%', alignItems: 'flex-end' }}>
            <Text>{formatToEuro(donation.attributes.amount ?? 0)}</Text>
          </View>
        </View>
      ))}
      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCellBottom, width: '14%', fontFamily: 'Helvetica-Bold' }}>
          <Text>Gesamtsumme</Text>
        </View>
        <View style={{ ...styles.tableCellBottom, fontSize: 9, width: '31%' }} />
        <View style={{ ...styles.tableCellBottom, fontSize: 9, width: '25%' }} />
        <View
          style={{
            ...styles.tableCellBottomEnd,
            width: '10%',
            alignItems: 'flex-end',
            fontFamily: 'Helvetica-Bold',
          }}
        >
          <Text>{formatToEuro(sum)}</Text>
        </View>
      </View>
    </View>
  );
}
