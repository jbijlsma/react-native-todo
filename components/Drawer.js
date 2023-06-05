import { View, ImageBackground, Image, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Drawer({ headerHeight, drawerProps }) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          width: "100%",
          height: headerHeight,
          backgroundColor: "blue",
        }}
      >
        <ImageBackground
          source={require("../assets/mountains.jpg")}
          style={styles.backgroundImg}
          resizeMode="cover"
        >
          <View style={[styles.avatarImgContainer, { marginTop: insets.top }]}>
            <Image
              style={styles.avatarImg}
              source={{
                uri: "https://secure.gravatar.com/avatar/dad0b79139b72a32fafc32e123558b01?s=128",
              }}
            />
          </View>
          <View style={styles.avatarTextContainer}>
            <Text style={styles.name}>Jeroen Bijlsma</Text>
            <Text style={styles.email}>jeroen@bijlsma.com</Text>
          </View>
        </ImageBackground>
      </View>
      <DrawerContentScrollView
        {...drawerProps}
        style={{ backgroundColor: "white" }}
      >
        <DrawerItemList {...drawerProps} />
      </DrawerContentScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImg: {
    height: 100,
    width: "100%",
  },
  backgroundImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImgContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
  },
  avatarImg: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: "white",
  },
  email: {
    fontSize: 12,
    color: "white",
  },
  avatarTextContainer: {
    marginTop: 4,
    padding: 4,
    backgroundColor: "rgb(2,63,129)",
    opacity: 0.8,
  },
});

export default Drawer;
