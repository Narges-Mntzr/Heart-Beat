import React from "react";
import { View, Text, Button } from "react-native";
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
        <Button title="🚪 خروج" onPress={logic.handleLogout} color="#d9534f" />
        <View style={{ marginTop: 10 }}>
          <Button
            title="📤 اشتراک‌گذاری "
            onPress={logic.handleShare}
            color="#5cb85c"
          />
        </View>
      </View>
    </View>
  );
}
