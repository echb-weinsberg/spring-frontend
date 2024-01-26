import qs from 'qs';

export function qsQueryToStrapiParams(params: object) {
  return qs.parse(qs.stringify(params), {
    depth: 0,
  });
}

export function dateToStrapiYearFilter(date: Date) {
  const yearString = date.toLocaleDateString('de-DE', {
    year: 'numeric',
  });
  return { $between: [`${yearString}-01-01`, `${yearString}-12-31`] };
}
