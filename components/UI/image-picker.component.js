import {
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import storage from "@react-native-firebase/storage";

import Colors from "../../constants/Colors";
import ImagePicker from "react-native-image-crop-picker";
//import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";
import { BodyButton } from "../../src/components/buttons/button.component";
import { CloseButton } from "../../src/components/buttons/close.button.component";
import styled from "styled-components";

const DeleteButton = styled(CloseButton)`
  position: absolute;
  z-index: 999;
  right: 10px;
  top: 10px;
`;

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

  const storedImage = pickedImage.split("/")[0] === "https:";

  const deleteImageHandler = () => {
    //const imageRef = storage().refFromURL(pickedImage);
    //const fileName = imageRef.path.split("//");
    console.log(storedImage);
    /*try {
      storage().ref(`/images/products/${fileName}`).delete();
      setPickedImage(null);
      props.onImageTaken(null);
    } catch (err) {
      console.log(err.message);
    }*/
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
          buttonTitle="Take Photo"
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
  },
});
