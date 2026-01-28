import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../store/cart-store';
import { glassSurface, theme } from '../theme';

const Cart = () => {
  const router = useRouter();
  const { items, subtotal, incrementItem, decrementItem, removeItem, checkout } = useCart();

  const handleCheckout = () => {
    const order = checkout();
    if (order) {
      router.replace('/orders');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.glow} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={16} color={theme.colors.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.backButton} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCopy}>Add some gear to get started.</Text>
          <Pressable onPress={() => router.back()} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Browse store</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.product.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.cartItem, glassSurface]}>
              <Image source={item.product.heroImage} style={styles.cartImage} />
              <View style={styles.cartInfo}>
                <Text style={styles.cartTitle} numberOfLines={2}>
                  {item.product.title}
                </Text>
                <Text style={styles.cartPrice}>${item.product.price.toFixed(2)}</Text>
                <View style={styles.qtyRow}>
                  <Pressable onPress={() => decrementItem(item.product.id)} style={styles.qtyButton}>
                    <Text style={styles.qtyButtonText}>-</Text>
                  </Pressable>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                  <Pressable onPress={() => incrementItem(item.product.id)} style={styles.qtyButton}>
                    <Text style={styles.qtyButtonText}>+</Text>
                  </Pressable>
                  <Pressable onPress={() => removeItem(item.product.id)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={[styles.summaryCard, glassSurface]}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>Free</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <Pressable onPress={handleCheckout} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Checkout</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Cart;

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
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(110, 199, 255, 0.35)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceStrong,
    borderColor: theme.colors.outline,
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: theme.radius.md,
    marginBottom: 14,
  },
  cartImage: {
    width: 78,
    height: 78,
    borderRadius: theme.radius.sm,
  },
  cartInfo: {
    flex: 1,
    gap: 6,
  },
  cartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  cartPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: theme.colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  removeButton: {
    marginLeft: 'auto',
  },
  removeButtonText: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: theme.radius.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  summaryValue: {
    color: theme.colors.ink,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginVertical: 8,
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: theme.colors.ink,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  emptyCopy: {
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: 'center',
  },
});
