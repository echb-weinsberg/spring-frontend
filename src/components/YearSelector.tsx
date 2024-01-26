import { currentYearAtom } from '@/state';
import { Select } from '@mantine/core';
import { useAtom } from 'jotai';

export function YearSelector() {
  const [currentYear, setCurrentYear] = useAtom(currentYearAtom);
  const now = new Date().toLocaleDateString('de-DE', { year: 'numeric' });
  const years = Array.from(
    // @ts-ignore
    { length: now - '2020' },
    (_, index) => parseInt(now, 10) - index
  );
  const data = years.map((year) => ({ value: year.toString(), label: year.toString() }));
  return (
    <Select
      w="90px"
      value={currentYear}
      data={data}
      onChange={(year) => setCurrentYear(year ?? currentYear)}
    />
  );
}
