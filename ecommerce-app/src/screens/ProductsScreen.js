import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export default function ProductsScreen() {
  const { products, addToCart, toggleWishlist, wishlist } = useStore();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Products</Text>
        <Text style={styles.subHeading}>Simple picks for your clean store app</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onAddToCart={() => addToCart(item)}
              onToggleWishlist={() => toggleWishlist(item.id)}
              isWishlisted={wishlist.includes(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
    color: '#111827',
  },
  subHeading: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
});
