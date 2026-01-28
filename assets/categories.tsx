import { Category } from './types/category';
import { PRODUCTS } from './products';

export const CATEGORIES: Category[] = [
  {
    name: 'All',
    slug: 'all',
    imageUrl: require('../assets/images/hero.png'),
    products: PRODUCTS,
  },
  {
    name: 'Consoles',
    slug: 'consoles',
    imageUrl: require('../assets/images/ps-5-1.jpg'),
    products: PRODUCTS.filter(product => product.category.slug === 'consoles'),
  },
  {
    name: 'Gaming PCs',
    slug: 'gaming-pcs',
    imageUrl: require('../assets/images/mac-book-1.jpg'),
    products: PRODUCTS.filter(product => product.category.slug === 'gaming-pcs'),
  },
  {
    name: 'Laptops',
    slug: 'laptops',
    imageUrl: require('../assets/images/dell-1.jpg'),
    products: PRODUCTS.filter(product => product.category.slug === 'laptops'),
  },
  {
    name: 'Wheels',
    slug: 'wheels',
    imageUrl: require('../assets/images/head-set-1.jpg'),
    products: PRODUCTS.filter(product => product.category.slug === 'wheels'),
  },
  {
    name: 'Monitors',
    slug: 'monitors',
    imageUrl: require('../assets/images/samsung-1.jpg'),
    products: PRODUCTS.filter(product => product.category.slug === 'monitors'),
  },
  {
    name: 'Cards',
    slug: 'cards',
    imageUrl: require('../assets/images/i-phone-1.jpg'),
    products: PRODUCTS.filter(product => product.category.slug === 'cards'),
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    imageUrl: require('../assets/images/head-set-2.jpg'),
    products: PRODUCTS.filter(product => product.category.slug === 'accessories'),
  },
];
