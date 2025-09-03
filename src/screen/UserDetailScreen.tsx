import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../navigation/RootNavigator";
import { RootState } from "../store";

type Props = { route: RouteProp<RootStackParamList, "UserDetails"> };

export default function UserDetailScreen({ route }: Props) {
  const { id } = route.params;
  const user = useSelector((s: RootState) =>
    s.users.items.find((u) => String(u.id) === String(id))
  );

  return (
    <View style={{ flex: 1 }}>
      {!user ? (
        <Text style={{ padding: 12 }}>User not found</Text>
      ) : (
        <Card style={{ margin: 12  }}>
          <Card.Title title={user?.name} subtitle={user?.email} />
          <Card.Content>
            <Text>ID: {user?.id}</Text>
            <Text>Phone: {user?.phone}</Text>
            <Text>Website: {user?.website}</Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}
