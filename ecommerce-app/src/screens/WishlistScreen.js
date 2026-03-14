import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../context/StoreContext';

export default function WishlistScreen() {
  const { wishlist, getProductById, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.heading}>Wishlist</Text>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No wishlist items yet</Text>
            <Text style={styles.emptyText}>Tap Wishlist on any product to save it.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Wishlist</Text>

        <FlatList
          data={wishlist}
          keyExtractor={(id) => id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item: productId }) => {
            const product = getProductById(productId);
            if (!product) return null;

            return (
              <View style={styles.rowCard}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                <View style={styles.actionRow}>
                  <Pressable
                    style={styles.primaryBtn}
                    onPress={() => addToCart(product)}
                  >
                    <Text style={styles.primaryBtnText}>Add to Cart</Text>
                  </Pressable>

                  <Pressable
                    style={styles.secondaryBtn}
                    onPress={() => toggleWishlist(product.id)}
                  >
                    <Text style={styles.secondaryBtnText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
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
    marginBottom: 12,
    color: '#111827',
  },
  emptyBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  emptyText: {
    marginTop: 6,
    color: '#6b7280',
  },
  rowCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  price: {
    marginTop: 4,
    color: '#0f766e',
    fontWeight: '600',
  },
  actionRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#0f766e',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#111827',
    fontWeight: '600',
  },
});
