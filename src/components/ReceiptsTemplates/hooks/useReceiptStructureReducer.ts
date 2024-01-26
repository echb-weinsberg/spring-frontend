import { useReducer } from 'react';
import { Contents } from '../ReceiptPDF';
import ReceiptLogo from '../../../assets/receipt_logo.png';
import { DEFAULT_TEXT_FONTSIZE, SpringTextElement } from '../SpringText';
import { DEFAULT_IMAGE_SIZE, SpringImageElement } from '../SpringImage';
import { SpringSpaceElement } from '../SpringSpace';
import { SpringAddressElement } from '../SpringDonorAddress';
import {
  DEFAULT_DIVIDER_HEIGHT,
  DEFAULT_DIVIDER_WIDTH,
  SpringDividerElement,
} from '../SpringDivider';
import { SpringSignatureElement } from '../SpringSignature';

export type Section = 'header' | 'body' | 'footer' | 'address' | 'attachement';

export type ContentsAction =
  | {
      type: 'editEntry';
      payload: {
        element:
          | SpringTextElement
          | SpringImageElement
          | SpringSpaceElement
          | SpringDividerElement
          | SpringAddressElement
          | SpringSignatureElement;
        index: number;
        section: Section;
      };
    }
  | {
      type: 'deleteEntry';
      payload: {
        index: number;
        section: Section;
      };
    }
  | {
      type: 'moveEntry';
      payload: {
        index: number;
        direction: 'up' | 'down';
        section: Section;
      };
    }
  | {
      type: 'addEntry';
      payload: {
        type: 'text' | 'space' | 'divider' | 'image' | 'address' | 'signature' | 'donationsTable';
        section: Section;
      };
    };

const reducer = (state: Contents, action: ContentsAction): Contents => {
  switch (action.type) {
    case 'editEntry':
      switch (action.payload.section) {
        case 'header':
          return {
            ...state,
            //@ts-ignore
            header: [
              ...state.header.slice(0, action.payload.index),
              { ...state.header[action.payload.index], element: action.payload.element },
              ...state.header.slice(action.payload.index + 1),
            ],
          };
        case 'address':
          return {
            ...state,
            //@ts-ignore
            address: [
              ...state.address.slice(0, action.payload.index),
              { ...state.address[action.payload.index], element: action.payload.element },
              ...state.address.slice(action.payload.index + 1),
            ],
          };
        case 'body':
          return {
            ...state,
            //@ts-ignore
            body: [
              ...state.body.slice(0, action.payload.index),
              { ...state.body[action.payload.index], element: action.payload.element },
              ...state.body.slice(action.payload.index + 1),
            ],
          };
        case 'footer':
          return {
            ...state,
            //@ts-ignore
            footer: [
              ...state.footer.slice(0, action.payload.index),
              { ...state.footer[action.payload.index], element: action.payload.element },
              ...state.footer.slice(action.payload.index + 1),
            ],
          };
        case 'attachement':
          return {
            ...state,
            //@ts-ignore
            attachement: [
              ...state.attachement.slice(0, action.payload.index),
              { ...state.attachement[action.payload.index], element: action.payload.element },
              ...state.attachement.slice(action.payload.index + 1),
            ],
          };
      }
      break;

    case 'deleteEntry':
      switch (action.payload.section) {
        case 'header':
          return {
            ...state,
            header: [
              ...state.header.slice(0, action.payload.index),
              ...state.header.slice(action.payload.index + 1),
            ],
          };
        case 'address':
          return {
            ...state,
            address: [
              ...state.address.slice(0, action.payload.index),
              ...state.address.slice(action.payload.index + 1),
            ],
          };
        case 'body':
          return {
            ...state,
            body: [
              ...state.body.slice(0, action.payload.index),
              ...state.body.slice(action.payload.index + 1),
            ],
          };
        case 'footer':
          return {
            ...state,
            footer: [
              ...state.footer.slice(0, action.payload.index),
              ...state.footer.slice(action.payload.index + 1),
            ],
          };
        case 'attachement':
          return {
            ...state,
            attachement: [
              ...state.attachement.slice(0, action.payload.index),
              ...state.attachement.slice(action.payload.index + 1),
            ],
          };
      }
      break;

    case 'moveEntry':
      switch (action.payload.section) {
        case 'header':
          if (action.payload.direction === 'up') {
            return {
              ...state,
              header: [
                ...state.header.slice(0, action.payload.index - 1),
                state.header[action.payload.index],
                state.header[action.payload.index - 1],
                ...state.header.slice(action.payload.index + 1),
              ],
            };
          }
          if (action.payload.direction === 'down') {
            return {
              ...state,
              header: [
                ...state.header.slice(0, action.payload.index),
                state.header[action.payload.index + 1],
                state.header[action.payload.index],
                ...state.header.slice(action.payload.index + 2),
              ],
            };
          }
          return state;
        case 'address':
          if (action.payload.direction === 'up') {
            return {
              ...state,
              address: [
                ...state.address.slice(0, action.payload.index - 1),
                state.address[action.payload.index],
                state.address[action.payload.index - 1],
                ...state.address.slice(action.payload.index + 1),
              ],
            };
          }
          if (action.payload.direction === 'down') {
            return {
              ...state,
              address: [
                ...state.address.slice(0, action.payload.index),
                state.address[action.payload.index + 1],
                state.address[action.payload.index],
                ...state.address.slice(action.payload.index + 2),
              ],
            };
          }
          return state;
        case 'body':
          if (action.payload.direction === 'up') {
            return {
              ...state,
              body: [
                ...state.body.slice(0, action.payload.index - 1),
                state.body[action.payload.index],
                state.body[action.payload.index - 1],
                ...state.body.slice(action.payload.index + 1),
              ],
            };
          }
          if (action.payload.direction === 'down') {
            return {
              ...state,
              body: [
                ...state.body.slice(0, action.payload.index),
                state.body[action.payload.index + 1],
                state.body[action.payload.index],
                ...state.body.slice(action.payload.index + 2),
              ],
            };
          }
          return state;
        case 'footer':
          if (action.payload.direction === 'up') {
            return {
              ...state,
              footer: [
                ...state.footer.slice(0, action.payload.index - 1),
                state.footer[action.payload.index],
                state.footer[action.payload.index - 1],
                ...state.footer.slice(action.payload.index + 1),
              ],
            };
          }
          if (action.payload.direction === 'down') {
            return {
              ...state,
              footer: [
                ...state.footer.slice(0, action.payload.index),
                state.footer[action.payload.index + 1],
                state.footer[action.payload.index],
                ...state.footer.slice(action.payload.index + 2),
              ],
            };
          }
          return state;
        case 'attachement':
          if (action.payload.direction === 'up') {
            return {
              ...state,
              attachement: [
                ...state.attachement.slice(0, action.payload.index - 1),
                state.attachement[action.payload.index],
                state.attachement[action.payload.index - 1],
                ...state.attachement.slice(action.payload.index + 1),
              ],
            };
          }
          if (action.payload.direction === 'down') {
            return {
              ...state,
              attachement: [
                ...state.attachement.slice(0, action.payload.index),
                state.attachement[action.payload.index + 1],
                state.attachement[action.payload.index],
                ...state.attachement.slice(action.payload.index + 2),
              ],
            };
          }
          return state;
      }
      break;

    case 'addEntry':
      switch (action.payload.section) {
        case 'header':
          if (action.payload.type === 'text') {
            return {
              ...state,
              header: [
                ...state.header,
                {
                  type: 'text',
                  element: {
                    content: 'Lorem ipsum dolor sit amet',
                    style: { fontSize: DEFAULT_TEXT_FONTSIZE },
                  },
                },
              ],
            };
          }
          if (action.payload.type === 'space') {
            return {
              ...state,
              header: [...state.header, { type: 'space', element: { height: 10 } }],
            };
          }
          if (action.payload.type === 'divider') {
            return {
              ...state,
              header: [
                ...state.header,
                {
                  type: 'divider',
                  element: { height: DEFAULT_DIVIDER_HEIGHT, width: DEFAULT_DIVIDER_WIDTH },
                },
              ],
            };
          }
          if (action.payload.type === 'image') {
            return {
              ...state,
              header: [
                ...state.header,
                {
                  type: 'image',
                  element: {
                    src: ReceiptLogo,
                    size: DEFAULT_IMAGE_SIZE,
                    position: 'flex-start',
                  },
                },
              ],
            };
          }
          return state;

        case 'address':
          if (action.payload.type === 'text') {
            return {
              ...state,
              address: [
                ...state.address,
                {
                  type: 'text',
                  element: {
                    content: 'Lorem ipsum dolor sit amet',
                    style: { fontSize: DEFAULT_TEXT_FONTSIZE },
                  },
                },
              ],
            };
          }
          if (action.payload.type === 'space') {
            return {
              ...state,
              address: [
                ...state.address,
                { type: 'space', element: { height: DEFAULT_TEXT_FONTSIZE } },
              ],
            };
          }
          if (action.payload.type === 'address') {
            return {
              ...state,
              address: [
                ...state.address,
                { type: 'address', element: { style: { fontSize: DEFAULT_TEXT_FONTSIZE } } },
              ],
            };
          }
          return state;

        case 'body':
          if (action.payload.type === 'text') {
            return {
              ...state,
              body: [
                ...state.body,
                {
                  type: 'text',
                  element: {
                    content: 'Lorem ipsum dolor sit amet',
                    style: { fontSize: DEFAULT_TEXT_FONTSIZE },
                  },
                },
              ],
            };
          }
          if (action.payload.type === 'space') {
            return {
              ...state,
              body: [...state.body, { type: 'space', element: { height: DEFAULT_TEXT_FONTSIZE } }],
            };
          }
          if (action.payload.type === 'divider') {
            return {
              ...state,
              body: [
                ...state.body,
                {
                  type: 'divider',
                  element: { height: DEFAULT_DIVIDER_HEIGHT, width: DEFAULT_DIVIDER_WIDTH },
                },
              ],
            };
          }
          if (action.payload.type === 'image') {
            return {
              ...state,
              body: [
                ...state.body,
                {
                  type: 'image',
                  element: {
                    src: ReceiptLogo,
                    size: DEFAULT_IMAGE_SIZE,
                    position: 'flex-start',
                  },
                },
              ],
            };
          }
          return state;

        case 'footer':
          if (action.payload.type === 'text') {
            return {
              ...state,
              footer: [
                ...state.footer,
                {
                  type: 'text',
                  element: {
                    content: 'Lorem ipsum dolor sit amet',
                    style: { fontSize: DEFAULT_TEXT_FONTSIZE },
                  },
                },
              ],
            };
          }
          if (action.payload.type === 'space') {
            return {
              ...state,
              footer: [
                ...state.footer,
                { type: 'space', element: { height: DEFAULT_TEXT_FONTSIZE } },
              ],
            };
          }
          if (action.payload.type === 'divider') {
            return {
              ...state,
              footer: [
                ...state.footer,
                {
                  type: 'divider',
                  element: { height: DEFAULT_DIVIDER_HEIGHT, width: DEFAULT_DIVIDER_WIDTH },
                },
              ],
            };
          }
          if (action.payload.type === 'signature') {
            return {
              ...state,
              footer: [
                ...state.footer,
                {
                  type: 'signature',
                  element: {
                    contentLeft: {
                      contentBottom: 'Datum der Ausstellung',
                      contentTop: '{{date}}',
                      style: {},
                    },
                    contentRight: {
                      contentBottom: 'Unterschrift/Stempel d. Empfängers der Zuwendung',
                      contentTop: '',
                      style: {},
                    },
                    date: { fontSize: DEFAULT_TEXT_FONTSIZE },
                  },
                },
              ],
            };
          }
          break;

        case 'attachement':
          if (action.payload.type === 'donationsTable') {
            return {
              ...state,
              attachement: [
                ...state.attachement,
                {
                  type: 'donationsTable',
                  element: {},
                },
              ],
            };
          }
          if (action.payload.type === 'text') {
            return {
              ...state,
              attachement: [
                ...state.attachement,
                {
                  type: 'text',
                  element: {
                    content: 'Lorem ipsum dolor sit amet',
                    style: { fontSize: DEFAULT_TEXT_FONTSIZE },
                  },
                },
              ],
            };
          }
          if (action.payload.type === 'space') {
            return {
              ...state,
              attachement: [
                ...state.attachement,
                { type: 'space', element: { height: DEFAULT_TEXT_FONTSIZE } },
              ],
            };
          }
          if (action.payload.type === 'divider') {
            return {
              ...state,
              attachement: [
                ...state.attachement,
                {
                  type: 'divider',
                  element: { height: DEFAULT_DIVIDER_HEIGHT, width: DEFAULT_DIVIDER_WIDTH },
                },
              ],
            };
          }
          return state;
      }
      return state;
  }
};

export function useReceiptStructureReducer(initialData: Contents) {
  const [contents, dispatchContents] = useReducer(reducer, initialData);
  return [contents, dispatchContents] as const;
}
