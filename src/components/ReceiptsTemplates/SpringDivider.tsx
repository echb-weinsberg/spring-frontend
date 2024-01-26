import { View } from '@react-pdf/renderer';

export const DEFAULT_DIVIDER_HEIGHT = 1;
export const DEFAULT_DIVIDER_WIDTH = 100;
export type SpringDividerElement = {
  height: number;
  width?: number;
};

export function SpringDivider({ element }: { element: SpringDividerElement }) {
  return (
    <View
      style={{
        height: element.height ?? DEFAULT_DIVIDER_HEIGHT,
        backgroundColor: 'black',
        width: `${element.width ?? DEFAULT_DIVIDER_WIDTH}%`,
        alignSelf: 'center',
      }}
    />
  );
}
