import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearCart, removeFromCart } from '../store/slices/cartSlice';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((s: RootState) => s.cart);
  const items = Object.values(cart.items);

  return (
    <View style={{ flex: 1 }}>
      
      <View style={{ padding: 12 }}>
        <Text>Total items: {cart.totalCount}</Text>
        <Button mode="outlined" onPress={() => dispatch(clearCart())}>Clear Cart</Button>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <Card style={styles.row}>
            <Card.Title title={item.title} subtitle={` Price  -  ₹${item.price}`} />
            <Card.Actions>
              <Button onPress={() => dispatch(removeFromCart({ id: item.id }))}>Remove</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginHorizontal: 12, marginVertical: 6 }
});
