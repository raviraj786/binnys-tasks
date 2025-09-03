import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";

type Item = { id: string; title: string; price: number };

const ITEM_HEIGHT = 100; 

function generateItems(count = 5000, offset = 0): Item[] {
  const arr: Item[] = [];
  for (let i = 1 + offset; i <= count + offset; i++) {
    arr.push({
      id: String(i),
      title: `Product ${i}`,
      price: Math.round(Math.random() * 1000) / 100,
    });
  }
  return arr;
}

export default function ProductListScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);

  const pageSize = 100;
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Item[]>(() => generateItems(pageSize));

  
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const newItems = generateItems(pageSize, (nextPage - 1) * pageSize);
    setData((prev) => [...prev, ...newItems]);
    setPage(nextPage);
  }, [page]);

  const renderItem: ListRenderItem<Item> = useCallback(
    ({ item }) => {
      const isInCart = cart.some((c: any) => c.id === item.id);

      return (
        <Card style={styles.card}>
          <Card.Title title={item.title} subtitle={`₹${item.price}`} />
          <Card.Actions style={{ justifyContent: "space-between" }}>
            <Button
              mode="contained"
              onPress={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                  })
                )
              }
              disabled={isInCart}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </Button>

            {isInCart && (
              <Button
                mode="outlined"
                onPress={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </Button>
            )}
          </Card.Actions>
        </Card>
      );
    },
    [dispatch, cart]
  );

  const keyExtractor = useCallback((it: Item) => it.id, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={11}
        removeClippedSubviews
        contentContainerStyle={{ padding: 8, paddingBottom: 24 }}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBlock:10
    
  },
});
