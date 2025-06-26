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
  
  function isPersian(text) {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ضربان</Text>

      <TextInput
        style={[styles.input,{textAlign: isPersian(username) || (username.length==0)? 'right' : 'left'}]}
        placeholder="نام کاربری"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />

      <TextInput
        style={[styles.input,{textAlign: isPersian(password) || (password.length==0)? 'right' : 'left'}]}
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
