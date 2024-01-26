import { DonorTitleEnum } from '@/generated';

export function getReadableTitle(title: DonorTitleEnum) {
  switch (title) {
    case DonorTitleEnum.Mr:
      return 'Herr';
    case DonorTitleEnum.Mrs:
      return 'Frau';
    case DonorTitleEnum.MrAndMrs:
      return 'Herr und Frau';
    case DonorTitleEnum.None:
      return '';
  }
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
