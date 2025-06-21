import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import axios from "axios";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 40, marginBottom: 30, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    width: "50%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 18,
    marginBottom: 10,
  },
  loginButton: {
    width: "20%",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center", 
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
