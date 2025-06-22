import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#0f9df5",
  },
  input: {
    borderColor: "#aaa",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: "80%",
  },
  error: {
    color: "red",
    fontSize: 18,
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
    paddingVertical: 14,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
