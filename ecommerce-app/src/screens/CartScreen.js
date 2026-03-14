import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../context/StoreContext';

export default function CartScreen() {
  const {
    cartItems,
    getProductById,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartTotal,
  } = useStore();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.heading}>Cart</Text>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>Add products from the Products tab.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Cart</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const product = getProductById(item.productId);
            if (!product) return null;

            return (
              <View style={styles.rowCard}>
                <View style={styles.rowTop}>
                  <Text style={styles.title}>{product.title}</Text>
                  <Pressable onPress={() => removeFromCart(item.productId)}>
                    <Text style={styles.remove}>Remove</Text>
                  </Pressable>
                </View>

                <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                <View style={styles.qtyRow}>
                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => decreaseQty(item.productId)}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </Pressable>

                  <Text style={styles.qtyValue}>{item.quantity}</Text>

                  <Pressable
                    style={styles.qtyBtn}
                    onPress={() => increaseQty(item.productId)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </Pressable>

                  <Text style={styles.lineTotal}>
                    ${(product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${cartTotal.toFixed(2)}</Text>
            </View>
          }
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
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
    color: '#111827',
  },
  remove: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  price: {
    marginTop: 4,
    color: '#6b7280',
  },
  qtyRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 20,
  },
  qtyValue: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  lineTotal: {
    marginLeft: 'auto',
    fontWeight: '700',
    color: '#0f766e',
  },
  totalCard: {
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 16,
    color: '#0f766e',
    fontWeight: '800',
  },
});
