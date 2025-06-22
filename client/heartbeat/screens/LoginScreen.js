import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import styles from "../styles/LoginScreenStyles";
import config from "../config";

const BASE_URL = config.BASE_URL;

export default function LoginScreen({ navigation, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const res = await axios.post(`${BASE_URL}/login/`, {
        username,
        password,
      });
      setUserId(res.data.user_id);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
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
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heartbeat</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
