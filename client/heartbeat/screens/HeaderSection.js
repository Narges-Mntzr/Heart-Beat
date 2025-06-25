import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import styles from "../styles/HomeScreenStyles";

export default function HeaderSection({ logic }) {
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={styles.title}>{logic.userInfo?.username}</Text>
        <Text style={styles.subtitle}>
          تاریخ عضویت: {logic.userInfo?.date_joined}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.modalButtons, { backgroundColor: "#d9534f" }]}
          onPress={logic.handleLogout}
        >
          <Text style={styles.modalButtonsText}>🚪 خروج</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modalButtons,
            { backgroundColor: "#5cb85c", marginTop: 5 },
          ]}
          onPress={logic.handleShare}
        >
          <Text style={styles.modalButtonsText}>📤 اشتراک‌گذاری </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
