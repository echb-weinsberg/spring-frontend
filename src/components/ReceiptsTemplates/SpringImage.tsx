import { Image, View } from '@react-pdf/renderer';

export type ImagePosition = 'flex-end' | 'flex-start' | 'center';

export type SpringImageElement = {
  position: ImagePosition;
  src: string;
  size: number;
};

export const DEFAULT_IMAGE_SIZE = 45;

export function SpringImage({ element, url }: { element: SpringImageElement; url: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: element.position,
      }}
    >
      <Image
        src={{ uri: url, method: 'GET', body: null, headers: {} }}
        style={{ height: element.size ?? DEFAULT_IMAGE_SIZE }}
      />
    </View>
  );
}
