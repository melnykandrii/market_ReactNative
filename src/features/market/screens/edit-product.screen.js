import * as productsActions from "../../../../store/actions/products";
import storage from "@react-native-firebase/storage";
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
import DefaultInputCont from "../../../../components/UI/InputComponent";
import { ImgPicker } from "../../../components/image-picker/image-picker.component";

import { BodyButton } from "../../../components/buttons/button.component";
import { theme } from "../../../infrastructure/theme";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../../../components/UI/HeaderButton";
import { LoadingState } from "../../../components/loading/loading-state.component";
import { Spacer } from "../../../components/typography/spacer/spacer.component";

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
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Submit"
            iconName="checkmark-outline"
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, submitHandler]);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <ImgPicker
          onImageTaken={imageHandler}
          imageUrl={imageUrl}
          onPress={onNavigate}
          editedProduct={editedProduct}
        />

        <View style={styles.form}>
          <DefaultInputCont
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            //value={formState.inputValues.title}
            //onChangeText={textChangeHandler.bind(this, 'title')}
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
          />
          {editedProduct ? null : (
            <DefaultInputCont
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              //value={formState.inputValues.price}
              //onChangeText={textChangeHandler.bind(this, 'price')}
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
            />
          )}
          <DefaultInputCont
            id="description"
            label="Description"
            //value={formState.inputValues.description}
            //onChangeText={textChangeHandler.bind(this, 'description')}
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
            style={styles.button}
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
  form: {
    paddingHorizontal: 10,
  },
  button: {
    alignSelf: "center",
    marginBottom: 10,
    borderColor: theme.colors.bg.grey,
  },
});