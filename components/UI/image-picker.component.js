import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Colors from "../../constants/Colors";
import ImagePicker from "react-native-image-crop-picker";

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
    const image = await ImagePicker.openCamera({
      allowsEditing: true,
      compressImageQuality: 0.5,
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
      compressImageQuality: 0.5,
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
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Shoot"
          color={Colors.primaryColor}
          onPress={takeImageHandler}
        />
        <Button
          style={styles.button}
          title="Select"
          color={Colors.primaryColor}
          onPress={selectImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePickerContainer: {
    marginBottom: 15,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
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
    borderWidth: 2,
    backgroundColor: Colors.primaryColory,
    height: 50,
    width: 140,
    borderColor: Colors.disablediOS,
    borderRadius: 10,
  },
});
