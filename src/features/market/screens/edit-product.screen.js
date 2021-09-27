import * as productsActions from "../../../services/store/actions/products";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../components/typography/input/input.component";
import { ImgPicker } from "../../../components/image-picker/image-picker.component";

import { BodyButton } from "../../../components/buttons/button.component";
import { theme } from "../../../infrastructure/theme";
import { LoadingState } from "../../../components/loading/loading-state.component";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import { SaveHeaderButton } from "../../../components/buttons/save-header-button.component";
import { InfoScreen } from "../../../components/info/info-screen.component";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

export const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //const { item, edit } = props.route.params ? props.route.params : {};
  const prodId = props.route.params?.productId ?? null;
  //const prodId = props.route.params.productId
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      //imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      //imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const oldImageUrl = editedProduct ? editedProduct.imageUrl : "";

  const imageHandler = (image) => {
    setImageUrl(image);
  };

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check errors in the form.", [
        { text: "Ok" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            imageUrl,
            oldImageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [
    formState,
    editedProduct,
    props.navigation,
    dispatch,
    prodId,
    imageUrl,
    oldImageUrl,
  ]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <SaveHeaderButton
          onPress={submitHandler}
          buttonDisabled={!imageUrl}
          color={!imageUrl ? theme.colors.ui.primary : theme.colors.bg.primary}
        />
      ),
    });
  }, [imageUrl, props.navigation, submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const onNavigate = () => {
    props.navigation.navigate("ImageScreen", {
      imageUrl: imageUrl,
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <InfoScreen
        title="An error occured!"
        subTitle="Please try again."
        buttonTitle="Try again"
        iconName="close"
        buttonIcon="reload"
        compact="true"
        iconBg={theme.colors.ui.error}
        onPress={() => {}}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboard}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={styles.keyboard}
        contentContainerStyle={styles.contentContainer}
      >
        <ImgPicker
          onImageTaken={imageHandler}
          imageUrl={imageUrl}
          onPress={onNavigate}
          editedProduct={editedProduct}
          disabled={!imageUrl}
        />

        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboard="default"
            autoCapitalize="words"
            autoCorrect
            returnKey="next"
            submit={() => {
              editedProduct ? this.descRef.focus() : this.priceRef.focus();
            }}
            blur={false}
            placeholder="Title"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
            mainColor={theme.colors.bg.black}
            borderColor={theme.colors.bg.black}
            textColor={theme.colors.bg.black}
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboard="decimal-pad"
              returnKey="next"
              submit={() => {
                this.descRef.focus();
              }}
              inputRef={(priceRef) => {
                this.priceRef = priceRef;
              }}
              blur={false}
              placeholder="0.00"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
              mainColor={theme.colors.bg.black}
              borderColor={theme.colors.bg.black}
              textColor={theme.colors.bg.black}
            />
          )}
          <Input
            id="description"
            label="Description"
            keyboard="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            submit={Keyboard.dismiss}
            inputRef={(descRef) => {
              this.descRef = descRef;
            }}
            blur={false}
            placeholder="Description"
            errorText="Please enter a Description"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
            mainColor={theme.colors.bg.black}
            borderColor={theme.colors.bg.black}
            textColor={theme.colors.bg.black}
          />
        </View>
        <Spacer position="bottom" size="xxl" />
        <BodyButton
          buttonTitle="Save"
          mode="outlined"
          onPress={submitHandler}
          buttonColor={theme.colors.bg.black}
          style={styles.button}
          disabled={!imageUrl}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  contentContainer: { flexGrow: 1 },
  form: {
    paddingHorizontal: 10,
  },
  button: {
    alignSelf: "center",
    marginBottom: 10,
    borderColor: theme.colors.bg.grey,
  },
});
