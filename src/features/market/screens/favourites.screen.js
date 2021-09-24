import * as cartActions from "../../../../store/actions/cart";
import * as productsActions from "../../../../store/actions/products";

import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { InfoScreen } from "../../../components/info/info-screen.component";
import ProductItem from "../components/product-item.component";
import React, { useState, useCallback, useEffect } from "react";
import { BodyButton } from "../../../components/buttons/button.component";
import { LoadingState } from "../../../components/loading/loading-state.component";
import { theme } from "../../../infrastructure/theme";
import { ProductsList } from "../components/products-list.component";

export const FavouritesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const favProducts = useSelector((state) => state.products.favouriteProducts);
  console.log(favProducts);

  const dispatch = useDispatch();
  /*
  const loadFavourites = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchFavourites());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadFavourites();
  }, [dispatch, loadFavourites]);
*/
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

  if (favProducts.length === 0 || !favProducts) {
    return (
      <InfoScreen
        title="Your wish list is empty"
        subTitle="Start adding some in order to see it here. Tap on the button to start shopping."
        buttonTitle="Shop"
        onPress={() => {
          props.navigation.navigate("Simple Market");
        }}
      />
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <ProductsList
      data={favProducts}
      viewProductHandler={viewProductHandler}
      toggleFavouriteHandler={toggleFavouriteHandler}
      addToCardHandler={addToCardHandler}
    />
  );
};
