import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Set, addToFavorites, deleteSet, getSet } from "@/data/api";
import { defaultStyleSheet } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [set, setSet] = useState<Set>();

  console.log(id);

  useEffect(() => {
    if (!id) return;
    const loadSet = async () => {
      const data = await getSet(id);
      setSet(data);
      console.log(data);
    };
    loadSet();
  }, [id]);

  const onAddToFavourites = async () => {
    await addToFavorites(id!);
    router.push("/(tabs)/sets");
    console.log("button clicked!");
  };

  const onDeleteSet = async () => {
    console.log(id);
    await deleteSet(id!);
    router.push("/(tabs)/search");
  };

  return (
    <View style={defaultStyleSheet.container}>
      {set && (
        <View
          style={{ alignContent: "flex-start", padding: 16, gap: 10, flex: 1 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.header}>{set.title}</Text>
            <View style={{ flexDirection: "row", gap: 25 }}>
              <Link href={`(modals)/set/update/${set.id}`}>
                <Ionicons name="create-outline" size={24} color={"#008000"} />
              </Link>
              <Pressable onPress={onDeleteSet}>
                <Ionicons name="trash-outline" size={24} color={"#ff0000"} />
              </Pressable>
            </View>
          </View>
          <Text style={{ color: "#666" }}>{set.cards} Cards</Text>
          {set.image && (
            <Image
              source={{ uri: set.image.url }}
              style={{ width: "100%", height: 200 }}
            />
          )}
          <Text>{set.description}</Text>
          <Text style={{ color: "#666" }}>Created By ww: {set.creator}</Text>
        </View>
      )}
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={defaultStyleSheet.bottomButton}
          onPress={onAddToFavourites}
        >
          <Text style={defaultStyleSheet.buttonText}>Add to Favorites</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 400,
  },
});

export default Page;
