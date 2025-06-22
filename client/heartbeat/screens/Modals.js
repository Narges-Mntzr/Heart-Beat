import React from "react";
import {
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
      {/* Following List */}
      <Modal visible={logic.showFollowingList} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>Following</Text>
            <FlatList
              style={{ marginBottom: 10 }}
              data={logic.following}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <View style={styles.userRow}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    {item.unseen_message_id ? (
                      <TouchableOpacity
                        onPress={() => logic.handleSeeMessage(item.unseen_message_id)}
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

                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
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
            <Button title="Close" onPress={() => logic.setShowFollowingList(false)} />
          </View>
        </View>
      </Modal>

      {/* Followers List */}
      <Modal visible={logic.showFollowersList} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalViewLarge}>
            <Text style={styles.sectionTitle}>Followers</Text>
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
            <Button title="Close" onPress={() => logic.setShowFollowersList(false)} />
          </View>
        </View>
      </Modal>

      {/* Follow Modal */}
      <Modal visible={logic.showFollowModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>Find and Follow a Friend</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
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
              <Button title="Follow" onPress={logic.handleFollow} />
              <Button
                title="Cancel"
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

      {/* Send Message */}
      <Modal visible={logic.messageModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              Send a message to {logic.selectedFollower?.username}
            </Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              multiline
              placeholder="Type your message..."
              value={logic.messageContent}
              onChangeText={logic.setMessageContent}
              maxLength={100}
            />
            {logic.messageError ? (
              <Text style={styles.error}>{logic.messageError}</Text>
            ) : null}
            <View style={styles.modalButtons}>
              <Button title="Send" onPress={logic.handleSendMessage} />
              <Button
                title="Cancel"
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

      {/* Seen Message */}
      <Modal visible={logic.showIncomingMessageModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>
              Message from {logic.incomingMessageContent.sender_username}
            </Text>
            <Text style={styles.subtitle}>
              Sent: {logic.incomingMessageContent.sent_at}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 20 }}>
              {logic.incomingMessageContent.content}
            </Text>
            <Button title="Close" onPress={() => logic.setShowIncomingMessageModal(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}
