import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import { Platform } from "react-native";
import ProductItem from "../../components/shop/ProducItem";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";

const ShopScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  console.log(products);

  // const displayedProducts = useSelector(state => state.products.filteredProducts);
  /*
    const prodId = products.id;

    const availableProducts = useSelector(state => state.products.filteredProducts);

    const displayedProducts = availableProducts.filter(
        product => product.id.indexOf(prodId) >= 0
    );
*/
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

  const viewProductHandler = (id, title) => {
    props.navigation.navigate("Product Details", {
      productId: id,
      productTitle: title,
    });
  };

  const addToCardHandler = (item) => {
    dispatch(cartActions.addToCart(item));
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

  if (!isLoading && products.length === 0) {
    return (
      <DefaultEmptyScreen
        title="There is no product available for you."
        subTitle="You can add your products if you`d like. It will be available for you and for everyone. Tap on the button and start adding."
        buttonTitle="My Product"
        navigateTo={() => {
          console.log("Add a product screen navigation");
          props.navigation.navigate("My Products");
        }}
      />
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            viewProductHandler(item.id, item.title);
          }}
        >
          <BodyButton
            title="View Details"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onNavi={() => {
              viewProductHandler(item.id, item.title);
            }}
            buttonIcon="binoculars"
            style={styles.button}
            compact="true"
          />
          <BodyButton
            title="Add to Cart"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onNavi={() => {
              addToCardHandler(item);
            }}
            buttonIcon="cart-arrow-down"
            style={styles.button}
            compact="true"
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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

export default ShopScreen;
