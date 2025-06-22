import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("userId").then((id) => {
      if (id) setUserId(id);
      setLoading(false);
    });
  }, []);

  const handleSetUserId = async (id) => {
    if (id === null) {
      await AsyncStorage.removeItem("userId");
      setUserId(null);
    } else {
      await AsyncStorage.setItem("userId", id.toString());
      setUserId(id);
    }
  };

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userId ? (
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen
                {...props}
                userId={userId}
                setUserId={handleSetUserId}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setUserId={handleSetUserId} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
