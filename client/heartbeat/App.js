import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
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

  const [fontsLoaded] = useFonts({
    Vazirmatn: require("./assets/fonts/Vazirmatn.ttf"),
    VazirmatnBold: require("./assets/fonts/Vazirmatn-Bold.ttf"),
    Ray: require("./assets/fonts/Ray.ttf"),
    RayBold: require("./assets/fonts/Ray-Bold.ttf"),
    Shabnam: require("./assets/fonts/Shabnam.ttf"),
    ShabnamBold: require("./assets/fonts/Shabnam-Bold.ttf"),
  });

  if (loading || !fontsLoaded) return null;
  
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
            {(props) => <LoginScreen {...props} setUserId={handleSetUserId} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
