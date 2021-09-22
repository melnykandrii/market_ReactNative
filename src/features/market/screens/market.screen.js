import React, { useEffect, useState, useCallback } from "react";
import * as cartActions from "../../../../store/actions/cart";
import * as productsActions from "../../../../store/actions/products";

import { FlatList, StyleSheet, RefreshControl } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../components/product-item.component";
import { BodyButton } from "../../../components/buttons/button.component";
import { theme } from "../../../infrastructure/theme";
import { LoadingState } from "../../../components/loading/loading-state.component";
import { InfoScreen } from "../../../components/info/info-screen.component";

export const ShopScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  // const displayedProducts = useSelector(state => state.products.filteredProducts);
  /*
    const prodId = products.id;

    const availableProducts = useSelector(state => state.products.filteredProducts);

    const displayedProducts = availableProducts.filter(
        product => product.id.indexOf(prodId) >= 0
    );
*/
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const focus = props.navigation.addListener("focus", loadProducts);
    return () => {
      focus();
    };
  }, [loadProducts, props.navigation]);

  const viewProductHandler = (id, title, { item }) => {
    props.navigation.navigate("Product Details", {
      productId: id,
      productTitle: title,
      item: item,
    });
  };

  const addToCardHandler = (item) => {
    dispatch(cartActions.addToCart(item));
  };

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
        onPress={loadProducts}
      />
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <InfoScreen
        title="There is no product yet."
        subTitle="You can add one if you`d like and it will be available for everyone. Tap on the button and start adding."
        buttonTitle="My Products"
        compact="true"
        onPress={() => {
          props.navigation.navigate("For Sale");
        }}
      />
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.bg.black}
          colors={[theme.colors.ui.primary]}
          refreshing={isLoading}
          onRefresh={loadProducts}
        />
      }
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            viewProductHandler(item.id, item.title, { item });
          }}
        >
          <BodyButton
            buttonTitle="View"
            buttonColor={theme.colors.text.primary}
            mode="outlined"
            onPress={() => {
              viewProductHandler(item.id, item.title, { item });
            }}
            style={styles.button}
            compact="true"
          />
          <BodyButton
            buttonTitle="Order"
            buttonColor={theme.colors.text.primary}
            mode="outlined"
            onPress={() => {
              addToCardHandler(item);
            }}
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
});