import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultEmptyScreen from "../../components/UI/EmptyScreen";
import ProductItem from "../../components/shop/ProducItem";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";
import { LoadingState } from "../../src/components/loading/loading-state.component";

const ShopScreen = (props) => {
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
      <DefaultEmptyScreen
        title="An error occured!"
        subTitle="Please try again."
        buttonTitle="Try again"
        iconName="close"
        buttonIcon="reload"
        compact="true"
        iconBg={theme.colors.ui.error}
        onNavi={loadProducts}
      />
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <DefaultEmptyScreen
        title="There is no product yet."
        subTitle="You can add one if you`d like and it will be available for everyone. Tap on the button and start adding."
        buttonTitle="My Products"
        compact="true"
        onNavi={() => {
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
            title="View"
            buttonColor={theme.colors.text.primary}
            mode="outlined"
            onNavi={() => {
              viewProductHandler(item.id, item.title);
            }}
            buttonIcon="binoculars"
            style={styles.button}
            compact="true"
          />
          <BodyButton
            title="Buy"
            buttonColor={theme.colors.text.primary}
            mode="outlined"
            onNavi={() => {
              addToCardHandler(item);
            }}
            buttonIcon="cart-plus"
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
