import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Card,
  createCard,
  deleteCard,
  deleteSet,
  getCardsForSet,
} from "@/data/api";
import { defaultStyleSheet } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [information, setInformation] = useState({
    question: "",
    answer: "",
  });
  const router = useRouter();

  if (!id) return;

  const loadCards = async () => {
    const data = await getCardsForSet(id);
    setCards(data);
  };

  useEffect(() => {
    loadCards();
  }, [id]);

  const onAddCard = async () => {
    const newCard = await createCard({ set: id, ...information });
    setCards([...cards, newCard]);
    setInformation({
      question: "",
      answer: "",
    });
  };

  const onDeleteSet = async () => {
    deleteSet(id!);
    router.push("/(tabs)/sets");
  };

  const onDeleteCard = async (id: string) => {
    console.log(id);
    deleteCard(id!);
    loadCards();
  };

  return (
    <View
      style={[
        defaultStyleSheet.container,
        { marginTop: 20, marginHorizontal: 16 },
      ]}
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={onDeleteSet} style={{ marginRight: 20 }}>
              <Ionicons name="trash-outline" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />

      <TextInput
        style={defaultStyleSheet.input}
        placeholder="Questions"
        value={information.question}
        onChangeText={(text) =>
          setInformation({ ...information, question: text })
        }
      />
      <TextInput
        style={defaultStyleSheet.input}
        placeholder="Answer"
        value={information.answer}
        onChangeText={(text) =>
          setInformation({ ...information, answer: text })
        }
      />
      <Pressable style={defaultStyleSheet.button} onPress={onAddCard}>
        <Text style={defaultStyleSheet.buttonText}>Add card</Text>
      </Pressable>

      <View style={{ marginTop: 20 }}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={{
              padding: 16,
              backgroundColor: "#fff",
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", maxWidth: 200 }}>
              <Text style={{ fontWeight: "bold" }}>{card.question}</Text>
              <Text>{card.answer}</Text>
            </View>
            <Pressable onPress={() => onDeleteCard(card.id)}>
              <Ionicons name="trash-outline" size={24} color={"#ff0000"} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Page;
