// HomeScreenStyles.js
import { StyleSheet } from "react-native";

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

export default styles;
