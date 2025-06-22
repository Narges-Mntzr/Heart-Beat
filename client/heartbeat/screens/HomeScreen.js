import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  View,
  Text,
  Animated,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Button,
  ScrollView,
  Share,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/HomeScreenStyles";
import config from "../config";

const BASE_URL = config.BASE_URL;

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
  const [suggestions, setSuggestions] = useState([]);

  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [messageError, setMessageError] = useState("");
  const [incomingMessageContent, setIncomingMessageContent] = useState("");
  const [showIncomingMessageModal, setShowIncomingMessageModal] =
    useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fetchData = async () => {
    const [res1, res2, res3] = await Promise.all([
      axios.get(`${BASE_URL}/following/${userId}/`),
      axios.get(`${BASE_URL}/followers/${userId}/`),
      axios.get(`${BASE_URL}/user/${userId}/`),
    ]);
    setFollowing(res1.data);
    setFollowers(res2.data);
    setUserInfo(res3.data);
  };

  const sendHeartbeat = async () => {
    await axios.post(`${BASE_URL}/heartbeat/`, { user_id: userId });
    fetchData();
  };

  const handleFollow = async () => {
    try {
      setError("");
      await axios.post(`${BASE_URL}/follow/`, {
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

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      setMessageError("Message cannot be empty.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/send-message/`, {
        sender_id: userId,
        receiver_username: selectedFollower.username,
        content: messageContent.slice(0, 100),
      });

      setMessageModalVisible(false);
      setMessageContent("");
      setSelectedFollower(null);
      setMessageError("");
    } catch (err) {
      setMessageError(err.response?.data?.error || "Failed to send message.");
    }
  };

  const fetchSuggestions = async (text) => {
    setFollowTarget(text);
    if (!text) return setSuggestions([]);
    try {
      const res = await axios.get(`${BASE_URL}/search_users/`, {
        params: { q: text, user_id: userId },
      });
      setSuggestions(res.data);
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleSeeMessage = async (messageId) => {
    try {
      const res = await axios.get(`${BASE_URL}/seen-message/${messageId}/`);
      setIncomingMessageContent(res.data);
      setShowIncomingMessageModal(true);
      fetchData();
    } catch (err) {
      alert("Failed to fetch message.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleShare = async () => {
    try {
      const message = config.SHARE_MESSAGE.replace('__USERNAME__', userInfo?.username || '');
      await Share.share({ message });
    } catch (error) {
      alert("Something went wrong while sharing.");
      console.log("Share error:", error);
    }
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
        <View>
          <Button title="🚪 Log Out" onPress={handleLogout} color="#d9534f" />
          <View style={{ marginTop: 10 }}>
            <Button
              title="📤 Share"
              onPress={handleShare}
              color="#5cb85c"
            />
          </View>
        </View>
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
          <Text style={styles.heartbeatText}>
            {userInfo?.last_heartbeat
              ? `Last beat: ${userInfo.last_heartbeat}`
              : "Send Heartbeat"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Modal: Following List */}
      <Modal visible={showFollowingList} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>Following</Text>
            <FlatList
              style={{ marginBottom: 10 }}
              data={following}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <View style={styles.userRow}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {item.unseen_message_id ? (
                      <TouchableOpacity
                        onPress={() => handleSeeMessage(item.unseen_message_id)}
                      >
                        <Ionicons
                          name="mail-unread-outline"
                          size={24}
                          color="#e67e22"
                          style={{ marginRight: 4 }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View style={{ width: 24, height: 24, marginRight: 4 }} />
                    )}
                    <Text style={styles.userName}>{item.username}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
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

      {/* Modal: Followers List + Send Message */}
      <Modal visible={showFollowersList} animationType="slide" transparent>
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
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedFollower(item);
                      setMessageModalVisible(true);
                    }}
                  >
                    <Ionicons
                      name="chatbox-ellipses-outline"
                      size={24}
                      color="#0f9df5"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Button title="Close" onPress={() => setShowFollowersList(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal: Follow Modal */}
      <Modal visible={showFollowModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>Find and Follow a Friend</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              value={followTarget}
              onChangeText={fetchSuggestions}
            />
            {suggestions.map((user, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFollowTarget(user.username);
                  setSuggestions([]);
                }}
                style={styles.suggestionItem}
              >
                <Text>{user.username}</Text>
              </TouchableOpacity>
            ))}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.modalButtons}>
              <Button title="Follow" onPress={handleFollow} />
              <Button
                title="Cancel"
                color="#aaa"
                onPress={() => {
                  setShowFollowModal(false);
                  setError("");
                  setFollowTarget("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Send Message */}
      <Modal visible={messageModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              Send a message to {selectedFollower?.username}
            </Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              multiline
              placeholder="Type your message..."
              value={messageContent}
              onChangeText={setMessageContent}
              maxLength={100}
            />
            {messageError ? (
              <Text style={styles.error}>{messageError}</Text>
            ) : null}
            <View style={styles.modalButtons}>
              <Button title="Send" onPress={handleSendMessage} />
              <Button
                title="Cancel"
                color="#aaa"
                onPress={() => {
                  setMessageModalVisible(false);
                  setMessageError("");
                  setMessageContent("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Seen Message */}
      <Modal
        visible={showIncomingMessageModal}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              Message from {incomingMessageContent.sender_username}
            </Text>
            <Text style={styles.subtitle}>
              Sent: {incomingMessageContent.sent_at}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 20 }}>
              {incomingMessageContent.content}
            </Text>
            <Button
              title="Close"
              onPress={() => setShowIncomingMessageModal(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
