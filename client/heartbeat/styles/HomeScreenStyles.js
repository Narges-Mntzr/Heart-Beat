// HomeScreenStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  addFriendCard: {
    alignItems: "left",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  addFriendText: {
    color: "#0f9df5",
    fontSize: 12,
    fontFamily: "ShabnamBold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Shabnam",
    textAlign: "right",
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  heartWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  heartImage: {
    width: 30,
    height: 30,
  },
  heartEmoji: {
    color: "white",
    fontSize: 20,
    marginRight: 6,
  },
  heartStatus: {
    fontSize: 30,
    lineHeight: 32,
    textAlignVertical: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontFamily: "Shabnam",
    marginBottom: 12,
    color: "black",
  },
  modalButtons: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    minWidth: 90,
  },
  modalButtonsText: {
    color: "white",
    fontSize: 13,
    fontFamily: "ShabnamBold",
    textAlign: "center",
  },
  modalViewButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  largeModalButtons: {
    alignItems: "center",
    backgroundColor: "#0f9df5",
    borderRadius: 10,
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  largeModalButtonsText: {
    color: "white",
    fontSize: 16,
    fontFamily: "ShabnamBold",
  },
  messageText: {
    fontSize: 16,
    marginVertical: 20,
    fontFamily: "Shabnam",
    textAlign: "right",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalViewLarge: {
    width: "90%",
    maxHeight: "75%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "ShabnamBold",
    marginBottom: 18,
    textAlign: "right",
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
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  statLabel: {
    color: "#555",
    fontSize: 12,
    fontFamily: "Shabnam",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 10,
    marginVertical: 20,
  },
  subtitle: {
    color: "gray",
    fontFamily: "Shabnam",
    fontSize: 14,
  },
  subtitleMessage: {
    color: "gray",
    fontFamily: "Shabnam",
    fontSize: 14,
    textAlign: "right",
    marginTop: -10,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 6,
  },
  userItem: {
    display: "none",
  },
});

export default styles;
