import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyleSheet = StyleSheet.create({
  container: {
    flex: 1, //The div will grow in same proportion as the window-size
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  bottomButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    width: 300,
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  input: {
    height: 40,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
    marginBottom: 10
  },
});
