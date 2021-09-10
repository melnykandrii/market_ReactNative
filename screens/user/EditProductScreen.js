import * as productsActions from "../../store/actions/products";

import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultButton from "../../components/UI/DefaultButton";
import DefaultInputCont from "../../components/UI/InputComponent";
import { ImgPicker } from "../../components/UI/image-picker.component";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";

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

const EditProductScreen = (props) => {
  const { item, edit } = props.route.params ? props.route.params : {};
  const prodId = props.route.params?.productId ?? "";
  //const prodId = props.route.params.productId
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(
    props.route.params && edit ? item.imageUrl : null
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const imageHandler = (image) => {
    setImageUrl(image);
  };
  /*
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
*/

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check errors in the form.", [
        { text: "Ok" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [
    formState.formIsValid,
    formState.inputValues.title,
    formState.inputValues.description,
    formState.inputValues.price,
    editedProduct,
    props.navigation,
    dispatch,
    prodId,
    imageUrl,
  ]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <ImgPicker onImageTaken={imageHandler} imageUrl={imageUrl} />
        </View>

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
            //submit={() => (editedProduct ? null : this.priceRef.focus())}
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
              //submit={() => this.descRef.focus()}
              //inputRef={(priceRef) => (this.priceRef = priceRef)}
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
            returnKey="done"
            submit={() => {
              props.route.params.submit();
            }}
            //inputRef={(descRef) => (this.descRef = descRef)}
            blur={false}
            placeholder="Description"
            errorText="Please enter a Description"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
        <BodyButton
          title="Save"
          buttonColor={theme.colors.ui.primary}
          mode="outlined"
          onNavi={() => {
            props.route.params.submit();
          }}
          buttonIcon="file-send"
          style={styles.button}
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
    marginTop: 10,
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
