import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.metaRow}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
      </View>

      <Text numberOfLines={1} style={styles.title}>
        {product.title}
      </Text>

      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.primaryBtn} onPress={onAddToCart}>
          <Text style={styles.primaryBtnText}>Add to Cart</Text>
        </Pressable>

        <Pressable
          style={[styles.secondaryBtn, isWishlisted && styles.secondaryBtnActive]}
          onPress={onToggleWishlist}
        >
          <Text style={styles.secondaryBtnText}>
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#6b7280',
  },
  rating: {
    fontSize: 12,
    color: '#6b7280',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f766e',
    marginTop: 6,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#0f766e',
    paddingVertical: 10,
    borderRadius: 10,
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
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  secondaryBtnActive: {
    borderColor: '#0f766e',
    backgroundColor: '#ccfbf1',
  },
  secondaryBtnText: {
    color: '#111827',
    fontWeight: '600',
  },
});
