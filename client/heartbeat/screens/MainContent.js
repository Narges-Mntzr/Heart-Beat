import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/HomeScreenStyles";

export default function MainContent({ logic }) {
  return (
    <>
      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => logic.setShowFollowingList(true)}
        >
          <Text style={styles.statNumber}>{logic.following.length}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => logic.setShowFollowersList(true)}
        >
          <Text style={styles.statNumber}>{logic.followers.length}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.addFriendCard}
          onPress={() => logic.setShowFollowModal(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
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

      <TouchableOpacity style={styles.heartbeatButton} onPress={logic.sendHeartbeat}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Animated.Text
            style={[
              styles.heartEmoji,
              { opacity: logic.userInfo?.last_heartbeat ? 0.5 : logic.fadeAnim },
            ]}
          >
            ❤️
          </Animated.Text>
          <Text style={styles.heartbeatText}>
            {logic.userInfo?.last_heartbeat
              ? `Last beat: ${logic.userInfo.last_heartbeat}`
              : "Send Heartbeat"}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
