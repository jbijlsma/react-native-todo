import { StyleSheet, View, Text } from "react-native";

function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Really? You need help making a todo list ;)
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 24,
  },
});

export default HelpScreen;
