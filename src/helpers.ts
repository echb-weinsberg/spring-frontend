import fuzzysort from 'fuzzysort';

export function fuzzySearch(query: string, keys: string[], data: any[]) {
  const results = fuzzysort.go(query, data, { keys });
  return results.filter((result) => result.score > -1000).map((result) => result.obj);
}
