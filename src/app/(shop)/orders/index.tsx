import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useCart } from '../../../store/cart-store';
import { glassSurface, theme } from '../../../theme';

const Orders = () => {
  const router = useRouter();
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.background} />
        <View style={styles.glow} />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptyCopy}>Your next drop is waiting.</Text>
          <Pressable onPress={() => router.push('/')} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Shop now</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.glow} />

      <FlatList
        data={orders}
        keyExtractor={order => order.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.orderCard, glassSurface]}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order {item.id}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
              <Text style={styles.orderStatus}>{item.status}</Text>
            </View>
            <View style={styles.itemsRow}>
              {item.items.slice(0, 3).map(orderItem => (
                <Image
                  key={orderItem.product.id}
                  source={orderItem.product.heroImage}
                  style={styles.itemThumb}
                />
              ))}
              {item.items.length > 3 && (
                <View style={styles.moreBadge}>
                  <Text style={styles.moreBadgeText}>+{item.items.length - 3}</Text>
                </View>
              )}
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
              <Text style={styles.orderItems}>{item.items.length} items</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Orders;

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
    top: -40,
    left: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 184, 77, 0.35)',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  orderCard: {
    padding: 16,
    borderRadius: theme.radius.lg,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  orderDate: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.ink,
    backgroundColor: theme.colors.accentTertiary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  itemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 14,
  },
  moreBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceStrong,
  },
  moreBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  orderItems: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: theme.colors.ink,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
