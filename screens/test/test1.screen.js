import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";

export const Test1 = () => {
  const [image, setImage] = useState(null);
  const [path, setPath] = useState(null);

  const openPickerHandler = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((img) => {
      setPath(img.path.toString());
      setImage(img.path.split("/").pop());
      //filename = img.path.split("/").pop();
    });
  };

  const uploadToStorage = (path, image) => {
    let reference = storage().ref(image);
    console.log(path);
    let task = reference.putFile(path);
    task
      .then(() => {
        console.log("Image uploaded to bucket!");
      })
      .catch((e) => console.log("uploading errors", e));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text
            style={{ textAlign: "center", fontSize: 20, paddingBottom: 10 }}
          >
            Pick Images from Camera & Gallery
          </Text>
          <View style={styles.ImageSections}>
            <View>
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: path }}
              />
            </View>
            <View>
              <Text style={{ textAlign: "center" }}>File Uri</Text>
            </View>
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity
              onPress={openPickerHandler}
              style={styles.btnSection}
            >
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openPickerHandler}
              style={styles.btnSection}
            >
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={uploadToStorage}
              style={styles.btnSection}
            >
              <Text style={styles.btnText}>Directly Launch Image Library</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "grey",
  },

  body: {
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    height: Dimensions.get("screen").height - 20,
    width: Dimensions.get("screen").width,
  },
  ImageSections: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: "center",
  },
  images: {
    width: 150,
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: "center",
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
  },
});
