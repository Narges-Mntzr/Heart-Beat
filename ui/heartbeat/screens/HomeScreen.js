// screens/HomeScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ userId, setUserId }) {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followTarget, setFollowTarget] = useState("");

  const fetchData = async () => {
    const [res1, res2] = await Promise.all([
      axios.get(`http://192.168.1.102:8000/api/following/${userId}/`),
      axios.get(`http://192.168.1.102:8000/api/followers/${userId}/`),
    ]);
    setFollowing(res1.data);
    setFollowers(res2.data);
  };

  const sendHeartbeat = async () => {
    await axios.post("http://192.168.1.102:8000/api/heartbeat/", {
      user_id: userId,
    });
    fetchData();
  };

  const handleFollow = async () => {
    if (!followTarget) return;
    await axios.post("http://192.168.1.102:8000/api/follow/", {
      follower_id: userId,
      followed_username: followTarget,
    });
    setFollowTarget("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    setUserId(null);
  };

  const fadeAnim = useRef(new Animated.Value(1)).current;

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>Welcome!</Text>
        <Button title="🚪 Log Out" onPress={handleLogout} color="#d9534f" />
      </View>
      <TouchableOpacity style={styles.heartbeatButton} onPress={sendHeartbeat}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Animated.Text style={[styles.heartEmoji, { opacity: fadeAnim }]}>
            ❤️
          </Animated.Text>
          <Text style={styles.heartbeatText}> Send Heartbeat</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Follow someone:</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Username to follow"
          value={followTarget}
          onChangeText={setFollowTarget}
        />
        <Button title="Follow" onPress={handleFollow} />
      </View>

      <Text style={styles.sectionTitle}>Following</Text>
      <FlatList
        data={following}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <Text>
            {item.username} - {item.heartbeat ? "❤️" : "🤍"}
          </Text>
        )}
      />

      <Text style={styles.sectionTitle}>Followers</Text>
      <FlatList
        data={followers}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => <Text>{item.username}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  heartbeatButton: {
    backgroundColor: "#0f9df5",
    width: 200,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
  },
  heartbeatText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  heartEmoji: {
    color: "white",
    fontSize: 18,
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: { marginTop: 20, fontSize: 18, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
