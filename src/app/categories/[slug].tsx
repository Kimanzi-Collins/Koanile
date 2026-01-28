import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { PRODUCTS } from '../../../assets/products'
import { ProductListItem } from '../../components/product-list-item'
import { theme } from '../../theme'

const Category = () => {
  const { slug } = useLocalSearchParams<{ slug?: string }>()

  const data = useMemo(() => {
    if (!slug) return PRODUCTS
    return PRODUCTS.filter(product => product.category.slug === slug)
  }, [slug])

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={styles.list}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        ListHeaderComponent={() => (
          <Text style={styles.headerText}>
            {slug ? slug.toString().split('-').join(' ') : 'All'}
          </Text>
        )}
      />
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
  },
  list: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.ink,
    marginVertical: 12,
    textTransform: 'capitalize',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: 'space-between',
  },
})
