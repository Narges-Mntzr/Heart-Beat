// HomeScreenStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    title: { fontSize: 40, marginBottom: 30, fontWeight: "bold" },
    input: {
      borderWidth: 1,
      borderColor: "#aaa",
      width: "50%",
      padding: 10,
      marginBottom: 15,
      borderRadius: 5,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
    },
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 10,
    },
    loginButton: {
      width: "20%",
      backgroundColor: "#007bff",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      alignSelf: "center", 
      marginTop: 10,
    },
    loginButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
  

export default styles;
