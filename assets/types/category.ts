import { ImageSourcePropType } from 'react-native';
import { Product } from './product';

export type Category = {
  name: string;
  imageUrl: ImageSourcePropType;
  slug: string;
  products: Product[];
};
