// LoginScreenStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  error: {
    color: "red",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: "#aaa",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    width: "50%",
  },
  loginButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 12,
    width: "20%",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },
});

export default styles;
