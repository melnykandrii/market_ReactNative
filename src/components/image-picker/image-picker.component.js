import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
//import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../infrastructure/theme";
import { BodyButton } from "../buttons/button.component";

export const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState(props.imageUrl);

  /* const verifyCameraPermissions = async () => {
    const result = await ImagePicker.openCamera();
    console.log(result);
     if (result.status !== "granted") {
      Alert.alert(
        "Insufusiant permisions!",
        "You need to grant camera permisions!",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const verifyMediaPermissions = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufusiant permisions!",
        "You need to grant media-library permisions!",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };
*/
  const takeImageHandler = async () => {
    /*  const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) {
      return;
    }*/
    try {
      const image = await ImagePicker.openCamera({
        allowsEditing: true,
        compressImageQuality: 1,
        width: 1000,
        height: 1500,
        cropping: true,
      });
      setPickedImage(image.path);
      props.onImageTaken(image.path);
    } catch (err) {
      if (err.message === "User cancelled image selection") {
        return;
      }
    }
  };

  const selectImageHandler = async () => {
    try {
      const image = await ImagePicker.openPicker({
        allowsEditing: true,
        width: 1000,
        height: 1500,
        cropping: true,
      });
      setPickedImage(image.path);
      props.onImageTaken(image.path);
    } catch (err) {
      if (err.message === "User cancelled image selection") {
        return;
      }
    }
  };

  return (
    <View style={styles.imagePickerContainer}>
      <TouchableOpacity
        disabled={props.editedProduct ? false : true}
        onPress={props.onPress}
      >
        <View style={styles.imageContainer}>
          {!pickedImage ? (
            <Text style={styles.emptyText}>No image picked yet.</Text>
          ) : (
            <Image style={styles.image} source={{ uri: pickedImage }} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <BodyButton
          buttonTitle="Add Photo"
          mode="outlined"
          onPress={takeImageHandler}
          style={styles.button}
          buttonColor={theme.colors.bg.black}
        />

        <BodyButton
          buttonTitle="Select Image"
          mode="outlined"
          onPress={selectImageHandler}
          style={styles.button}
          compact={true}
          buttonColor={theme.colors.bg.black}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerContainer: {
    marginBottom: 10,
    padding: 5,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.ui.primary,
    borderWidth: 1.5,
    backgroundColor: theme.colors.ui.primary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 140,
    borderColor: theme.colors.bg.grey,
  },
  emptyText: {
    fontStyle: "italic",
    fontSize: 15,
    color: theme.colors.bg.primary,
  },
});
