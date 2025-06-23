import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import axios from "axios";
import styles from "../styles/LoginScreenStyles";
import config from "../config";

const BASE_URL = config.BASE_URL;

export default function LoginScreen({ navigation, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = async () => {
    try {
      setError("");
      const res = await axios.post(`${BASE_URL}/login/`, {
        username,
        password,
      });
      setUserId(res.data.user_id);
    } catch (err) {
      setError(err.response?.data?.error || "ورود ناموفق بود.");
    }
  };

  const handleRegister = async () => {
    try {
      setError("");
      const res = await axios.post(`${BASE_URL}/register/`, {
        username,
        password,
      });
      setUserId(res.data.user_id);
    } catch (err) {
      setError(err.response?.data?.error || "ثبت‌نام با مشکل مواجه شد.");
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={[styles.heartEmoji, { opacity: fadeAnim }]}
        >
          ❤️
        </Animated.Text>
        <Text style={styles.title}>ضربان</Text>
        
      </View>

      <TextInput
        style={styles.input}
        placeholder="نام کاربری"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="رمز عبور"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>ثبت‌نام </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>ورود</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
