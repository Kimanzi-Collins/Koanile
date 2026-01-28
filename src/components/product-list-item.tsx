import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { Product } from '../../assets/types/product'
import { glassSurface, theme } from '../theme'
import { useCart } from '../store/cart-store'

export const ProductListItem = ({product}: {product: Product}) => {
  const router = useRouter()
  const { addItem } = useCart()

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/product/[slug]', params: { slug: product.slug } })}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <View style={styles.imageWrap}>
        <Image source={product.heroImage} style={styles.itemImage} />
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle} numberOfLines={2}>{product.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
          {product.rating ? (
            <View style={styles.rating}>
              <FontAwesome name="star" size={12} color={theme.colors.accent} />
              <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            </View>
          ) : null}
        </View>
        <Pressable
          onPress={(event) => {
            event.stopPropagation?.();
            addItem(product);
          }}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    item: {
        width: '48%',
        marginVertical: 10,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        padding: 12,
        ...glassSurface,
    },
    itemPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    imageWrap: {
        width: '100%',
        borderRadius: theme.radius.md,
        height: 120,
        backgroundColor: theme.colors.surfaceTint,
        overflow: 'hidden',
    },
    itemTextContainer: {
        paddingTop: 10,
        gap: 6,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.ink,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.ink,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(255, 184, 77, 0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.ink,
        textTransform: 'uppercase',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.muted,
    },
    addButton: {
        marginTop: 6,
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.ink,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
})
