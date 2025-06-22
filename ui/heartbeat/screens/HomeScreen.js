// Updated HomeScreen.js with enhanced UI and follower/following pop-up lists
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ userId, setUserId }) {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followTarget, setFollowTarget] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);
  const [showFollowersList, setShowFollowersList] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const [res1, res2, res3] = await Promise.all([
      axios.get(`http://192.168.1.102:8000/api/following/${userId}/`),
      axios.get(`http://192.168.1.102:8000/api/followers/${userId}/`),
      axios.get(`http://192.168.1.102:8000/api/user/${userId}/`),
    ]);
    setFollowing(res1.data);
    setFollowers(res2.data);
    setUserInfo(res3.data);
  };

  const sendHeartbeat = async () => {
    await axios.post("http://192.168.1.102:8000/api/heartbeat/", {
      user_id: userId,
    });
    fetchData();
  };

  const handleFollow = async () => {
    try {
      setError("");
      const res = await axios.post("http://192.168.1.102:8000/api/follow/", {
        follower_id: userId,
        followed_username: followTarget,
      });
      setFollowTarget("");
      setShowFollowModal(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || "Follow friend failed.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    setUserId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{userInfo?.username}</Text>
          <Text style={styles.subtitle}>Joined: {userInfo?.date_joined}</Text>
        </View>
        <Button title="🚪 Log Out" onPress={handleLogout} color="#d9534f" />
      </View>

      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => setShowFollowingList(true)}
        >
          <Text style={styles.statNumber}>{following.length}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => setShowFollowersList(true)}
        >
          <Text style={styles.statNumber}>{followers.length}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.addFriendCard}
          onPress={() => setShowFollowModal(true)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="person-add"
              size={18}
              color="#0f9df5"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.addFriendText}>Add Friend</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.heartbeatButton} onPress={sendHeartbeat}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Animated.Text
            style={[
              styles.heartEmoji,
              { opacity: userInfo?.last_heartbeat ? 0.5 : fadeAnim },
            ]}
          >
            ❤️
          </Animated.Text>
          {userInfo?.last_heartbeat ? (
            <>
              <Text style={{ color: "#fff", fontSize: 14 }}>
                Last beat: {userInfo.last_heartbeat}
              </Text>
            </>
          ) : (
            <Text style={styles.heartbeatText}>Send Heartbeat</Text>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={showFollowingList}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>Following</Text>
            <FlatList
              style={{ marginBottom: 10 }}
              data={following}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <View style={styles.userRow}>
                  <Text style={styles.userName}>{item.username}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {item.last_heartbeat && (
                      <Text style={{ color: "red", fontSize: 12 }}>
                        {item.last_heartbeat}
                      </Text>
                    )}
                    <Text style={styles.heartStatus}>
                      {item.heartbeat ? "❤️" : "🤍"}
                    </Text>
                  </View>
                </View>
              )}
            />

            <Button title="Close" onPress={() => setShowFollowingList(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFollowersList}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>Followers</Text>
            <FlatList
              style={{ marginBottom: 10 }}
              data={followers}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <View style={styles.userRow}>
                  <Text style={styles.userName}>{item.username}</Text>
                </View>
              )}
            />
            <Button title="Close" onPress={() => setShowFollowersList(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={showFollowModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>Find and Follow a Friend</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              value={followTarget}
              onChangeText={setFollowTarget}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.modalButtons}>
              <Button title="Follow" onPress={handleFollow} />
              <Button
                title="Cancel"
                onPress={() => {
                  setShowFollowModal(false);
                  setError("");
                  setFollowTarget("");
                }}
                color="#aaa"
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "gray" },
  heartbeatButton: {
    backgroundColor: "#0f9df5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  heartbeatText: { color: "white", fontSize: 16, fontWeight: "bold" },
  heartEmoji: { color: "white", fontSize: 18, marginRight: 5 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  statCard: {
    alignItems: "left",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: { fontSize: 22, fontWeight: "bold" },
  statLabel: { fontSize: 16, color: "#555" },
  addFriendCard: {
    alignItems: "left",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  addFriendText: { fontSize: 20, fontWeight: "bold", color: "#0f9df5" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  userItem: {
    display: "none",
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginVertical: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  heartStatus: {
    fontSize: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalViewLarge: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    maxHeight: "70%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    borderLeftColor: "#ccc",
    borderLeftWidth: 3,
    marginVertical: 5,
    height: "100%",
    alignSelf: "stretch",
  },
  error: {
    color: "red",
    fontSize: 18,
    marginBottom: 10,
  },
});
