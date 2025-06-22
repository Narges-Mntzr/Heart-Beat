import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import styles from "../styles/LoginScreenStyles";


export default function LoginScreen({ navigation, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const res = await axios.post("http://192.168.1.102:8000/api/login/", {
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
      const res = await axios.post("http://192.168.1.102:8000/api/register/", {
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
        <View style={{ width: 20 }} />
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}