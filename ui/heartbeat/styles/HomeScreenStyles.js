// HomeScreenStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  addFriendCard: {
    alignItems: "left",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  addFriendText: {
    color: "#0f9df5",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  error: {
    color: "red",
    fontSize: 18,
    marginBottom: 10,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  heartEmoji: {
    color: "white",
    fontSize: 18,
    marginRight: 5,
  },
  heartbeatButton: {
    alignItems: "center",
    backgroundColor: "#0f9df5",
    borderRadius: 10,
    marginVertical: 15,
    paddingVertical: 12,
  },
  heartbeatText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  heartStatus: {
    fontSize: 30,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalViewLarge: {
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: "70%",
    padding: 20,
    width: "85%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  separator: {
    alignSelf: "stretch",
    borderLeftColor: "#ccc",
    borderLeftWidth: 3,
    height: "100%",
    marginVertical: 5,
  },
  statCard: {
    alignItems: "left",
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  statLabel: {
    color: "#555",
    fontSize: 16,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  subtitle: {
    color: "gray",
    fontSize: 14,
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  userRow: {
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userItem: {
    display: "none",
  },
});

export default styles;
