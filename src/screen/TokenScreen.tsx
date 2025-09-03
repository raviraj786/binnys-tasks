import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { deleteToken, getToken, storeToken } from "../utils/auth";

export default function TokenScreen() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => setToken(await getToken()))();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <Text style={{color:'#000' , margin:10 }}>Stored token: {token ?? "none"}</Text>
        <Button
        style={{margin:10}}
          mode="contained"
          onPress={async () => {
            await storeToken("dummy-token-123");
            setToken(await getToken());
          }}
        >
          Save Dummy Token
        </Button>
        <Button
          onPress={async () => {
            await deleteToken();
            setToken(await getToken());
          }}
        
        >
          Delete Token
        </Button>
      </View>
    </View>
  );
}
