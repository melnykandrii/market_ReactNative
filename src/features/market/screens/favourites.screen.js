import * as cartActions from "../../../services/store/actions/cart";
import * as productsActions from "../../../services/store/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { InfoScreen } from "../../../components/info/info-screen.component";
import React from "react";
import { ProductsList } from "../components/products-list.component";

export const FavouritesScreen = (props) => {
  const favProducts = useSelector((state) => state.products.favouriteProducts);
  const dispatch = useDispatch();
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

  return (
    <ProductsList
      data={favProducts}
      viewProductHandler={viewProductHandler}
      toggleFavouriteHandler={toggleFavouriteHandler}
      addToCardHandler={addToCardHandler}
    />
  );
};
