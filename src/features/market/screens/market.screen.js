import React, { useEffect, useState, useCallback } from "react";
import * as cartActions from "../../../services/store/actions/cart";
import * as productsActions from "../../../services/store/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../infrastructure/theme";
import { LoadingState } from "../../../components/loading/loading-state.component";
import { InfoScreen } from "../../../components/info/info-screen.component";
import { ProductsList } from "../components/products-list.component";

export const ShopScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);

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

  const toggleFavouriteHandler = (id) => {
    dispatch(productsActions.toggleFavourite(id));
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
    <ProductsList
      data={products}
      refreshing={isLoading}
      onRefresh={loadProducts}
      viewProductHandler={viewProductHandler}
      toggleFavouriteHandler={toggleFavouriteHandler}
      addToCardHandler={addToCardHandler}
    />
  );
};
