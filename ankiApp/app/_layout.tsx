import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="(modals)/set/[id]"
        options={{ presentation: "modal", title: "Set" }}
      />

      <Stack.Screen
        name="(modals)/set/create"
        options={{ presentation: "modal", title: "Create Card Set" }}
      />

      <Stack.Screen
        name="(modals)/set/update/[id]"
        options={{ presentation: "modal", title: "Edit Set" }}
      />

      <Stack.Screen
        name="(modals)/cards/[id]"
        options={{ presentation: "modal", title: "Cards" }}
      />
    </Stack>
  );
};

export default Layout;
