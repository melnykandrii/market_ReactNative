import * as productsActions from "../../store/actions/products";

import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import ProductItem from "../../components/shop/ProducItem";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await dispatch(productsActions.fetchProducts());
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  const editProductHandler = ({ item }, id, title) => {
    props.navigation.navigate("Edit Product", {
      item: item,
      productId: id,
      productTitle: title,
      edit: true,
    });
  };

  const deleteHandler = (id, image) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id, image));
        },
      },
    ]);
  };

  if (error) {
    return (
      <View style={styles.indicator}>
        <Text>An error ocurred!</Text>
        <Text />
        <Button title="Try again" onPress={() => {}} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator
          size="large"
          color={Platform.OS === "android" ? Colors.headdroid : Colors.labelios}
        />
      </View>
    );
  }

  if (!isLoading && userProducts.length === 0) {
    return (
      <DefaultEmptyScreen
        title="You don't have any products."
        subTitle="After adding it will appear here. Tap on the button to start adding."
        buttonTitle="Add My Product"
        navigateTo={() => {
          console.log("Add a product screen navigation");
          props.navigation.navigate("Edit Product");
        }}
      />
    );
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            editProductHandler({ item }, item.id, item.title);
          }}
        >
          <BodyButton
            title="Edit"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onNavi={() => {
              editProductHandler({ item }, item.id, item.title);
            }}
            buttonIcon="square-edit-outline"
            style={styles.button}
          />
          <BodyButton
            title="Delete"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onNavi={() => {
              deleteHandler(item.id, item.imageUrl);
            }}
            buttonIcon="trash-can"
            style={styles.button}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    backgroundColor: theme.colors.bg.primary,
  },
});

export default UserProductsScreen;
