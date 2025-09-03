import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchUsers } from "../store/slices/usersSlice";

export default function UsersScreen() {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { items, loading, error } = useSelector((s: RootState) => s.users);

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, [dispatch]);

  console.log(items);

  return (
    <View style={{ flex: 1 }}>
      {loading ? <ActivityIndicator style={{ marginTop: 24 }} /> : null}
      {error ? <Text style={{ padding: 12 }}>Error: {error}</Text> : null}

      <FlatList
        data={items}
        keyExtractor={(u) => String(u.id)}
        renderItem={({ item }) => (
          <Card style={{ margin: 8 }}>
            <Card.Title title={item.name} subtitle={item.email}
             />
            <Card.Actions>
              <Button
                onPress={() =>
                  nav.navigate("UserDetails" as any, { id: String(item.id) })
                }
              >
                Open
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
