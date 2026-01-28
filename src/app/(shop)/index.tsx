import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { PRODUCTS } from '../../../assets/products'
import { CATEGORIES } from '../../../assets/categories'
import { ProductListItem } from '../../components/product-list-item'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useCart } from '../../store/cart-store'
import { useAuth } from '../../store/auth-store'
import { glassSurface, theme } from '../../theme'

const Home = () => {
  const router = useRouter()
  const { itemsCount } = useCart()
  const { user, signOut } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')

  const handleSignOut = async () => {
    await signOut()
    router.replace('/auth/sign-in')
  }

  const data = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS
    return PRODUCTS.filter(product => product.category.slug === activeCategory)
  }, [activeCategory])

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <FlatList
        data={data}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={styles.list}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.headerEyebrow}>Koanile</Text>
                <Text style={styles.headerTitle}>Gaming Store</Text>
              </View>
              <Pressable style={styles.cartButton} onPress={() => router.push('/cart')}>
                <FontAwesome name="shopping-cart" size={18} color={theme.colors.ink} />
                {itemsCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{itemsCount}</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <View style={[styles.profileRow, glassSurface]}>
              <View>
                <Text style={styles.profileLabel}>Signed in as</Text>
                <Text style={styles.profileName}>
                  {user?.user_metadata?.full_name || user?.email || 'Koanile Member'}
                </Text>
              </View>
              <Pressable style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign out</Text>
              </Pressable>
            </View>

            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <FontAwesome name="search" size={14} color={theme.colors.muted} />
                <TextInput
                  placeholder="Search consoles, PCs, games..."
                  placeholderTextColor={theme.colors.muted}
                  style={styles.searchInput}
                />
              </View>
              <Pressable style={styles.filterButton}>
                <FontAwesome name="filter" size={16} color={theme.colors.ink} />
              </Pressable>
            </View>

            <View style={[styles.heroCard, glassSurface]}>
              <View style={styles.heroText}>
                <Text style={styles.heroEyebrow}>Weekend Drop</Text>
                <Text style={styles.heroTitle}>50% off Select Gear</Text>
                <Text style={styles.heroCopy}>Consoles, racing wheels, and headsets</Text>
                <Pressable style={styles.heroButton}>
                  <Text style={styles.heroButtonText}>Shop now</Text>
                </Pressable>
              </View>
              <View style={styles.heroOrb} />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
              {CATEGORIES.map(category => {
                const active = category.slug === activeCategory
                return (
                  <Pressable
                    key={category.slug}
                    onPress={() => setActiveCategory(category.slug)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {category.name}
                    </Text>
                  </Pressable>
                )
              })}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Gear</Text>
              <Text style={styles.sectionNote}>{data.length} items</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
  },
  glowOne: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255, 184, 77, 0.4)',
  },
  glowTwo: {
    position: 'absolute',
    bottom: 120,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(110, 199, 255, 0.35)',
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  list: {
    flex: 1,
  },
  flatListColumn: {
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  headerEyebrow: {
    color: theme.colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  profileRow: {
    marginTop: 14,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  profileName: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  signOutButton: {
    backgroundColor: theme.colors.ink,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  signOutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceStrong,
    borderColor: theme.colors.outline,
    borderWidth: 1,
    ...theme.shadow,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.accentSecondary,
    paddingHorizontal: 6,
    borderRadius: 999,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceStrong,
    borderColor: theme.colors.outline,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.ink,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accent,
  },
  heroCard: {
    marginTop: 18,
    borderRadius: theme.radius.lg,
    padding: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  heroText: {
    maxWidth: 220,
    gap: 6,
  },
  heroEyebrow: {
    fontSize: 12,
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  heroCopy: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  heroButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.ink,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  heroOrb: {
    position: 'absolute',
    right: -30,
    top: 10,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(146, 230, 167, 0.6)',
  },
  chipsRow: {
    marginTop: 18,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceStrong,
    borderColor: theme.colors.outline,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: theme.colors.ink,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  chipTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  sectionNote: {
    fontSize: 12,
    color: theme.colors.muted,
  },
})
