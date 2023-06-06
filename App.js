import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { View, Image, Text, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TodosScreen from "./screens/TodosScreen";
import HelpScreen from "./screens/HelpScreen";
import Drawer from "./components/Drawer";

export default function App() {
  const screen = Dimensions.get("screen");
  const headerHeight = Math.floor(screen.height * 0.2);

  const DrawerNavigator = createDrawerNavigator();

  const today = new Date();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <DrawerNavigator.Navigator
          initialRouteName="Todos"
          drawerContent={(props) => (
            <Drawer
              headerHeight={headerHeight}
              drawerProps={props}
            />
          )}
          screenOptions={({ navigation }) => {
            return {
              headerTransparent: true,
              headerStyle: {
                height: headerHeight,
              },
              headerTintColor: "white",
              headerBackground: () => (
                <View style={{ backgroundColor: "black" }}>
                  <Image
                    source={require("./assets/mountains.jpg")}
                    style={{
                      opacity: 0.5,
                      height: headerHeight,
                      width: "100%",
                    }}
                    resizeMode="cover"
                  />
                </View>
              ),
              headerLeft: () => {
                return <></>;
              },
              headerTitle: ({ children, tintColor }) => {
                return (
                  <View style={{ flex: 1 }}>
                    <Pressable>
                      <Ionicons
                        onPress={() => navigation.toggleDrawer()}
                        name="ios-menu-outline"
                        size={24}
                        color={tintColor}
                        style={{ marginBottom: 12 }}
                      />
                    </Pressable>
                    <Text
                      style={{
                        color: tintColor,
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    >
                      {children}
                    </Text>
                    <Text
                      style={{ color: tintColor, fontSize: 14, paddingTop: 12 }}
                    >
                      {today.toDateString()}
                    </Text>
                  </View>
                );
              },
            };
          }}
        >
          <DrawerNavigator.Screen
            name="Todos"
            options={{
              drawerIcon: ({ size, color }) => {
                return (
                  <Ionicons
                    name="list"
                    color={color}
                    size={size}
                  />
                );
              },
            }}
          >
            {(props) => (
              <TodosScreen
                {...props}
                headerHeight={headerHeight}
              />
            )}
          </DrawerNavigator.Screen>
          <DrawerNavigator.Screen
            name="Help"
            component={HelpScreen}
            options={{
              drawerIcon: ({ size, color }) => {
                return (
                  <Ionicons
                    name="ios-help-circle"
                    color={color}
                    size={size}
                  />
                );
              },
            }}
          />
        </DrawerNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
