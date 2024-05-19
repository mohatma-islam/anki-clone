import { View, Text, Pressable, TextInput, Switch, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Set, addToFavorites, createSet, editSet, getSet } from "@/data/api";
import { defaultStyleSheet } from "@/constants/Styles";
import * as ImagePicker from "expo-image-picker";
import Form from "../form";

const Page = () => {
  const router = useRouter();

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

  console.log("Set Id:", id);

  const [information, setInformation] = useState({
    title: "",
    description: "",
    private: false,
    image: null as any,
  });

  useEffect(() => {

      if (set) {
      setInformation({
        title: set.title || "",
        description: set.description || "",
        private: set.private || false,
        image: set.image?.url || null,
      });
    }
  }, [set]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setInformation({ ...information, image: result.assets[0].base64 });
    }
  };

  const onUpdateSet = async () => {
    const newSet = await editSet(information, id!);
    // addToFavorites(newSet.id);
    // router.back();
    router.push("/(tabs)/search");
  };

//   return <Form information={information} setInformation={setInformation} onSubmit={onUpdateSet} />;

  return (
    <>
      <View
        style={[
          defaultStyleSheet.container,
          { marginTop: 20, marginHorizontal: 26 },
        ]}
      >
        <TextInput
          style={defaultStyleSheet.input}
          placeholder="Enter Title"
          value={information.title}
          onChangeText={(titleValue) =>
            setInformation({ ...information, title: titleValue })
          }
        />

        <TextInput
          style={defaultStyleSheet.input}
          placeholder="Enter Description"
          value={information.description}
          onChangeText={(descriptionValue) =>
            setInformation({ ...information, description: descriptionValue })
          }
        />

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Switch
            value={information.private}
            onValueChange={(value) =>
              setInformation({ ...information, private: value })
            }
          />
          <Text>Private</Text>
        </View>

        <Pressable style={defaultStyleSheet.button} onPress={pickImage}>
          <Text style={defaultStyleSheet.buttonText}>Select Image</Text>
        </Pressable>

        {information.image && (
          <View style={{ marginTop: 16 }}>
            <Image
              source={{ uri: set ? `${information.image}` : `data:image/jpeg;base64,${information.image}` }}
              style={{ width: "100%", height: 200, marginTop: 16 }}
            />
          </View>
        )}
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable style={defaultStyleSheet.bottomButton} onPress={onUpdateSet}>
          <Text style={defaultStyleSheet.buttonText}>Update Set</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Page;
