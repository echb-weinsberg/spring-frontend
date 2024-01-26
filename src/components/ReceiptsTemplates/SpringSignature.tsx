import { View, Text } from '@react-pdf/renderer';
import { DEFAULT_TEXT_FONTSIZE } from './SpringText';

export type SpringSignatureElement = {
  contentLeft: { contentBottom: string; contentTop: string; style: any };
  contentRight: { contentBottom: string; contentTop: string; style: any };
  date: { fontSize: number };
};

export function SpringSignature({
  element,
  replaceVars,
}: {
  element: SpringSignatureElement;
  replaceVars: (content: string) => string;
}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: element.contentLeft.style.fontSize ?? DEFAULT_TEXT_FONTSIZE }}>
          {replaceVars(element.contentLeft.contentTop)}
        </Text>
        <Text style={{ fontSize: element.contentRight.style.fontSize ?? DEFAULT_TEXT_FONTSIZE }}>
          {replaceVars(element.contentRight.contentTop)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: element.contentLeft.style.fontSize ?? DEFAULT_TEXT_FONTSIZE,
            borderTop: '1px solid black',
          }}
        >
          {replaceVars(element.contentLeft.contentBottom)}
        </Text>
        <Text
          style={{
            fontSize: element.contentRight.style.fontSize ?? DEFAULT_TEXT_FONTSIZE,
            borderTop: '1px solid black',
          }}
        >
          {replaceVars(element.contentRight.contentBottom)}
        </Text>
      </View>
    </View>
  );
}
