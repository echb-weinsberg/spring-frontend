import { View } from '@react-pdf/renderer';

export type SpringSpaceElement = {
  height: number;
};

export function SpringSpace({ element }: { element: SpringSpaceElement }) {
  return <View style={{ height: element.height }} />;
}
