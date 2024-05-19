import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Set, deleteSet, getSets } from "@/data/api";
import { defaultStyleSheet } from "@/constants/Styles";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

const Page = () => {
  const [sets, setSets] = useState<Set[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    const data = await getSets();
    console.log(data);
    setSets(data);
  };

  // const onDeleteSet = async (id: any) => {
  //   console.log(id);
  //   await deleteSet(id!);
  //   loadSets();
  // };

  // const confirmDeleteSet = async (id: any) => {
  //   console.log("Confirm button clicked:", id);
  //   Alert.alert("Confirm Delete", "Are you sure you want to delete this set?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     { text: "Delete", onPress: () => onDeleteSet(id) },
  //   ]);
  // };

  const renderSetRow: ListRenderItem<Set> = ({ item }) => {
    return (
      <>
        <Link href={`/(modals)/set/${item.id}`} asChild>
          <Pressable style={styles.setRow}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              {item.image && (
                <Image
                  source={{ uri: item.image.url }}
                  style={{ width: 50, height: 50, borderRadius: 8 }}
                />
              )}
              {!item.image && <View style={{ width: 50, height: 50 }} />}
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={{ color: Colors.darkGrey }}>
                  {item.cards} Cards
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={"#ccc"}
              />
            </View>
          </Pressable>
        </Link>
        {/* <Pressable onPress={() => onDeleteSet(item.id)}>
          <Ionicons name="trash-outline" size={24} color={"#ff0000"} />
        </Pressable> */}
      </>
    );
  };

  return (
    <View style={defaultStyleSheet.container}>
      <View>
        <Button title="Refresh" onPress={loadSets} />
      </View>
      <FlatList
        data={sets}
        renderItem={renderSetRow}
        // refreshControl={
        //   <RefreshControl refreshing={isRefreshing} onRefresh={loadSets} />
        // }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    padding: 16,
    margin: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500", //thickness of the font
  },
});

export default Page;
