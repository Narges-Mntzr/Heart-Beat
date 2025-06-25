import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  heartEmoji: {
    fontSize: 28,
    marginRight: 10,
    marginBottom: 40,
  },
  title: {
    fontSize: 45,
    marginBottom: 40,
    color: "#0f9df5",
    fontFamily:"ShabnamBold"
  },
  input: {
    borderColor: "#aaa",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: "80%",
    fontFamily:"Shabnam",
  },
  error: {
    color: "red",
    fontSize: 15,
    fontFamily:"Shabnam",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily:"ShabnamBold",
  },
});

export default styles;
