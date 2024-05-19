import React from "react";
import { Link, Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Pressable, View } from "react-native";
import { getSets } from "@/data/api";
const Layout = () => {

  const loadSets = async () => {
    const data = await getSets();
    console.log(data);
    // setSets(data);
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="sets"
        options={{
          title: "My Sets",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerRight: () =>(
            <Link href="/(modals)/set/create" asChild>
                <Pressable style={{ marginRight: 20 }}>
                    <Ionicons name="add-outline" size={26} color={'#fff'}/>
                </Pressable>
            </Link>
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <Pressable style={{ marginRight: 10 }} onPress={loadSets}>
              {/* <Button title="Refresh" onPress={loadSets} /> */}
              <Ionicons name="refresh-outline" size={30} color={"#ccc"} />

            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
