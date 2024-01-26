import { Text } from '@react-pdf/renderer';

type SpringTextProps = {
  element: SpringTextElement;
  replaceVars: (content: string) => string;
};

export const DEFAULT_TEXT_FONTSIZE = 10;

export type SpringTextElement = {
  content: string;
  style?: any;
};

export function SpringText({ element, replaceVars }: SpringTextProps) {
  return (
    <Text style={{ fontSize: DEFAULT_TEXT_FONTSIZE, ...element.style }}>
      {replaceVars(element.content)}
    </Text>
  );
}
