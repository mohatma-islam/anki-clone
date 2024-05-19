import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE_KEY } from "@/data/api";

const Page = () => {
  const [hasId, setHasID] = useState(false);

  useEffect(() => {
    const loadId = async () => {
      const id = await AsyncStorage.getItem(USER_STORAGE_KEY);

      console.log('id:', id);

      if (!id) {
        const randomUserId = Math.random().toString(36);
        console.log("randomId:", randomUserId);
        await AsyncStorage.setItem(USER_STORAGE_KEY, randomUserId);

        console.log('No id found so, create a new one');
        setHasID(true);
      }
    };

    loadId();
  }, []);

  console.log('Test', hasId);

  if (hasId) {
    return <Redirect href="/(tabs)/sets" />;
  } else {
    // return <View />;
    return <Redirect href="/(tabs)/profile" />;
  }
};

export default Page;
