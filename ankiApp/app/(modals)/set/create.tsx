import { View, Text, Pressable, TextInput, Switch, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { addToFavorites, createSet } from "@/data/api";
import { defaultStyleSheet } from "@/constants/Styles";
import * as ImagePicker from "expo-image-picker";
import Form from "./form";

const Page = () => {
  const router = useRouter();

  const [information, setInformation] = useState({
    title: "",
    description: "",
    private: false,
    image: null as any,
  });

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

  const onCreateSet = async () => {
    const newSet = await createSet(information);
    addToFavorites(newSet.id);
    // router.back();
    router.push('/(tabs)/search');
  };

//   return <Form information={information} setInformation={setInformation} onSubmit={onCreateSet} />;

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
              source={{ uri: `data:image/jpeg;base64,${information.image}` }}
              style={{ width: "100%", height: 200, marginTop: 16 }}
            />
          </View>
        )}
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable style={defaultStyleSheet.bottomButton} onPress={onCreateSet}>
          <Text style={defaultStyleSheet.buttonText}>Create Set</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Page;
