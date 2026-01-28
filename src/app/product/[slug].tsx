import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PRODUCTS } from '../../../assets/products';
import { useCart } from '../../store/cart-store';
import { glassSurface, theme } from '../../theme';

const ProductDetail = () => {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const router = useRouter();
  const { addItem } = useCart();

  const product = PRODUCTS.find(item => item.slug === slug);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.glow} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.heroCard, glassSurface]}>
          <Image source={product.heroImage} style={styles.heroImage} />
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.category}>{product.category.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={[styles.detailCard, glassSurface]}>
          <Text style={styles.detailTitle}>What you get</Text>
          <Text style={styles.detailCopy}>
            Fast shipping, free returns, and expert support for every drop.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={() => addItem(product)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Add to cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
  },
  glow: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(146, 230, 167, 0.4)',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.surfaceStrong,
    borderColor: theme.colors.outline,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  backButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  heroCard: {
    marginTop: 12,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    padding: 10,
  },
  heroImage: {
    width: '100%',
    height: 260,
    borderRadius: theme.radius.lg,
  },
  titleRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.ink,
    flex: 1,
    marginRight: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  category: {
    marginTop: 6,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: theme.colors.muted,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.muted,
  },
  detailCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: theme.radius.lg,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 6,
  },
  detailCopy: {
    fontSize: 13,
    color: theme.colors.muted,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  primaryButton: {
    backgroundColor: theme.colors.ink,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  errorText: {
    marginTop: 40,
    textAlign: 'center',
    color: theme.colors.ink,
  },
});
