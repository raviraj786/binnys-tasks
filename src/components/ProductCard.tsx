import { Product } from "@/src/types/index";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface Props {
  product: Product;
  onAdd: () => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <Button title="Add" onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 1,
  },
  title: { fontSize: 16, fontWeight: "500" },
  price: { fontSize: 14, color: "#666" },
});
