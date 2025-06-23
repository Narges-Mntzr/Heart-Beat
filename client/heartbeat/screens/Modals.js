import React from "react";
import {
  Image,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/HomeScreenStyles";

export default function Modals({ logic }) {
  return (
    <>
      {/* لیست دنبال‌شده‌ها */}
      <Modal visible={logic.showFollowingList} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>ضربان‌هایی که دنبال می‌کنی</Text>
            <FlatList
              style={{ marginBottom: 10 }}
              data={logic.following}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <View style={styles.userRow}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <TouchableOpacity
                      onPress={() => logic.handleSeeMessage(item.unseen_message_id)}
                    >
                      <Ionicons
                        name="mail-unread-outline"
                        size={24}
                        color={item.unseen_message_id ? "#e67e22" : "#d6d3d0"}
                        style={{ marginRight: 4 }}
                      />
                    </TouchableOpacity>
                    <Text style={styles.userName}>{item.username}</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <View style={{ minWidth: 70 }}>
                      {item.last_heartbeat && (
                        <Text style={{ color: "red", fontSize: 12 }}>
                          {item.last_heartbeat}
                        </Text>
                      )}
                    </View>
                    <View style={styles.heartWrapper}>
                      <Image
                        source={
                          item.heartbeat
                            ? require("../assets/heart_red.png")
                            : require("../assets/heart_white.png")
                        }
                        style={styles.heartImage}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              )}
            />
            <Button title="بستن" onPress={() => logic.setShowFollowingList(false)} />
          </View>
        </View>
      </Modal>

      {/* لیست دنبال‌کننده‌ها */}
      <Modal visible={logic.showFollowersList} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>ضربان‌هایی که همراهت هستن</Text>
            <FlatList
              style={{ marginBottom: 10 }}
              data={logic.followers}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <View style={styles.userRow}>
                  <Text style={styles.userName}>{item.username}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      logic.setSelectedFollower(item);
                      logic.setMessageModalVisible(true);
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
            <Button title="بستن" onPress={() => logic.setShowFollowersList(false)} />
          </View>
        </View>
      </Modal>

      {/* مودال دنبال‌کردن */}
      <Modal visible={logic.showFollowModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>یافتن و دنبال‌کردن ضربان جدید</Text>
            <TextInput
              style={styles.input}
              placeholder="نام کاربری را وارد کن"
              value={logic.followTarget}
              onChangeText={logic.fetchSuggestions}
            />
            {logic.suggestions.map((user, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  logic.setFollowTarget(user.username);
                  logic.setSuggestions([]);
                }}
                style={styles.suggestionItem}
              >
                <Text>{user.username}</Text>
              </TouchableOpacity>
            ))}
            {logic.error ? <Text style={styles.error}>{logic.error}</Text> : null}
            <View style={styles.modalButtons}>
              <Button title="دنبالش کن" onPress={logic.handleFollow} />
              <Button
                title="انصراف"
                color="#aaa"
                onPress={() => {
                  logic.setShowFollowModal(false);
                  logic.setError("");
                  logic.setFollowTarget("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* مودال ارسال پیام */}
      <Modal visible={logic.messageModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              پیام به {logic.selectedFollower?.username}
            </Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              multiline
              placeholder="متن پیام را بنویس..."
              value={logic.messageContent}
              onChangeText={logic.setMessageContent}
              maxLength={100}
            />
            {logic.messageError ? (
              <Text style={styles.error}>{logic.messageError}</Text>
            ) : null}
            <View style={styles.modalButtons}>
              <Button title="ارسال" onPress={logic.handleSendMessage} />
              <Button
                title="انصراف"
                color="#aaa"
                onPress={() => {
                  logic.setMessageModalVisible(false);
                  logic.setMessageError("");
                  logic.setMessageContent("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* پیام دریافتی */}
      <Modal visible={logic.showIncomingMessageModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              پیام از طرف {logic.incomingMessageContent.sender_username}
            </Text>
            <Text style={styles.subtitle}>
              زمان ارسال: {logic.incomingMessageContent.sent_at}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 20 }}>
              {logic.incomingMessageContent.content}
            </Text>
            <Button
              title="بستن"
              onPress={() => logic.setShowIncomingMessageModal(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
