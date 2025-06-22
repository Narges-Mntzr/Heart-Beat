import { useEffect, useState, useRef } from "react";
import axios from "axios";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated, Share } from "react-native";

const BASE_URL = config.BASE_URL;

export default function useHomeScreenLogic({ userId, setUserId }) {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followTarget, setFollowTarget] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [showFollowModal, setShowFollowModal] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);
  const [showFollowersList, setShowFollowersList] = useState(false);
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

  const handleShare = async () => {
    try {
      const message = config.SHARE_MESSAGE.replace(
        "__USERNAME__",
        userInfo?.username || ""
      );
      await Share.share({ message });
    } catch (error) {
      alert("Something went wrong while sharing.");
      console.log("Share error:", error);
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

  return {
    userInfo,
    fetchSuggestions,
    following,
    followers,
    followTarget,
    setFollowTarget,
    suggestions,
    setSuggestions,
    error,
    setError,
    showFollowModal,
    setShowFollowModal,
    showFollowingList,
    setShowFollowingList,
    showFollowersList,
    setShowFollowersList,
    refreshing,
    onRefresh,
    fadeAnim,
    sendHeartbeat,
    handleFollow,
    handleLogout,
    handleShare,
    messageModalVisible,
    setMessageModalVisible,
    selectedFollower,
    setSelectedFollower,
    messageContent,
    setMessageContent,
    messageError,
    setMessageError,
    handleSendMessage,
    incomingMessageContent,
    showIncomingMessageModal,
    setShowIncomingMessageModal,
    handleSeeMessage,
  };
}
