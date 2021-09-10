import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Colors from "../../constants/Colors";
import ImagePicker from "react-native-image-crop-picker";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";
import { fontWeights } from "../../src/infrastructure/theme/fonts";

export const ImgPicker = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    const image = await ImagePicker.openCamera({
      allowsEditing: true,
      compressImageQuality: 0.9,
      width: 300,
      height: 400,
      cropping: true,
    });
    setPickedImage(image.path);
    props.onImageTaken(image.path);
  };

  const selectImageHandler = async () => {
    const image = await ImagePicker.openPicker({
      allowsEditing: true,
      compressImageQuality: 0.9,
      width: 300,
      height: 400,
      cropping: true,
    });
    setPickedImage(image.path);
    props.onImageTaken(image.path);
  };

  return (
    <View style={styles.imagePickerContainer}>
      <View style={styles.imageContainer}>
        {!pickedImage ? (
          <Text style={styles.emptyText}>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <BodyButton
          title="Take Photo"
          buttonColor={theme.colors.ui.primary}
          mode="outlined"
          onNavi={takeImageHandler}
          buttonIcon="camera"
          style={styles.button}
          compact="true"
        />
        <BodyButton
          title="Select Image"
          buttonColor={theme.colors.ui.primary}
          mode="outlined"
          onNavi={selectImageHandler}
          buttonIcon="camera-burst"
          style={styles.button}
          compact="true"
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
    backgroundColor: theme.colors.ui.tertiary,
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
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontStyle: "italic",
    fontSize: 15,
  },
});
