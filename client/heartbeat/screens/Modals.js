import React from "react";
import {
  Image,
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/HomeScreenStyles";

export default function Modals({ logic }) {
  function isPersian(text) {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(text);
  }

  return (
    <>
      {/* لیست دنبال‌شده‌ها */}
      <Modal
        visible={logic.showFollowingList}
        animationType="none"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>ضربان‌هایی که دنبال می‌کنی</Text>
            <FlatList
              style={{ marginBottom: 10 }}
              data={logic.following}
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
                    <TouchableOpacity
                      onPress={() => logic.handleSeeMessage(item.message_id)}
                      disabled={!item.message_id}
                    >
                      <Ionicons
                        name={
                          item.message_id && item.unseen_message
                            ? "mail-unread-outline"
                            : "mail-outline"
                        }
                        size={24}
                        color={item.message_id ? "#e67e22" : "#d6d3d0"}
                        style={{ marginRight: 4 }}
                      />
                    </TouchableOpacity>
                    <Text style={styles.userName}>{item.username}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <View style={{ minWidth: 70 }}>
                      {item.last_heartbeat && (
                        <Text
                          style={{
                            color: "red",
                            fontSize: 11,
                            fontFamily: "Shabnam",
                          }}
                        >
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
            <TouchableOpacity
              onPress={() => logic.setShowFollowingList(false)}
              style={styles.largeModalButtons}
            >
              <Text style={styles.largeModalButtonsText}>بستن</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* لیست دنبال‌کننده‌ها */}
      <Modal
        visible={logic.showFollowersList}
        animationType="none"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>
              کسانی که ضربان‌های تو را دنبال می‌کنند
            </Text>
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
                      logic.setShowFollowersList(false);
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
            <TouchableOpacity
              onPress={() => { logic.setShowFollowersList(true); logic.setShowFollowersList(false); }}
              style={styles.largeModalButtons}
            >
              <Text style={styles.largeModalButtonsText}>بستن</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* مودال دنبال‌کردن */}
      <Modal visible={logic.showFollowModal} animationType="none" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              یافتن و دنبال‌کردن ضربان جدید
            </Text>
            <TextInput
              style={[styles.input,{textAlign: isPersian(logic.followTarget) || (logic.followTarget.length==0)? 'right' : 'left'}]}
              placeholder="نام کاربری را وارد کنید."
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
            {logic.error ? (
              <Text style={styles.error}>{logic.error}</Text>
            ) : null}
            <View style={styles.modalViewButtons}>
              <TouchableOpacity
                style={styles.modalButtons}
                onPress={logic.handleFollow}
              >
                <Text style={styles.modalButtonsText}>دنبالش کن </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButtons, { backgroundColor: "#aaa" }]}
                onPress={() => {
                  logic.setShowFollowModal(false);
                  logic.setError("");
                  logic.setFollowTarget("");
                }}
              >
                <Text style={styles.modalButtonsText}>انصراف </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* مودال ارسال پیام */}
      <Modal
        visible={logic.messageModalVisible}
        animationType="none"
        transparent
      >
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
            <View style={styles.modalViewButtons}>
              <TouchableOpacity
                style={styles.modalButtons}
                onPress={logic.handleSendMessage}
              >
                <Text style={styles.modalButtonsText}>ارسال </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButtons, { backgroundColor: "#aaa" }]}
                onPress={() => {
                  logic.setMessageModalVisible(false);
                  logic.setMessageError("");
                  logic.setMessageContent("");
                }}
              >
                <Text style={styles.modalButtonsText}>انصراف </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* پیام دریافتی */}
      <Modal
        visible={logic.showIncomingMessageModal}
        animationType="none"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              پیام از طرف {logic.incomingMessageContent.sender_username}
            </Text>
            <Text style={styles.subtitleMessage}>
              زمان ارسال: {logic.incomingMessageContent.sent_at}
            </Text>
            <Text style={styles.messageText}>
              {logic.incomingMessageContent.content}
            </Text>
            <TouchableOpacity
              onPress={() => { logic.setShowFollowingList(true);logic.setShowIncomingMessageModal(false);  }}
              style={styles.largeModalButtons}
            >
              <Text style={styles.largeModalButtonsText}>بستن</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
