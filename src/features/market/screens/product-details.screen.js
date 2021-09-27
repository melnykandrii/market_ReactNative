import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../../../services/store/actions/cart";
import * as productsActions from "../../../services/store/actions/products";

import { theme } from "../../../infrastructure/theme";

import { BodyButton } from "../../../components/buttons/button.component";
import { Spacer } from "../../../components/typography/spacer/spacer.component";

import {
  Image,
  TopContainer,
  PriceContainer,
  ButtonContainer,
  HeaderLabel,
  Price,
  BottomContainer,
  Description,
} from "../styles/product-details-screen.styles";
import { InfoScreen } from "../../../components/info/info-screen.component";
import { FavouriteButton } from "../../../components/buttons/favourite-button.component";

export const ProductDetailsScreen = (props) => {
  const prodId = props.route.params.productId;
  const isFavourite = useSelector((state) =>
    state.products.favouriteProducts.find((product) => product.id === prodId)
  );
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();
  const toggleFavouriteHandler = (id) => {
    dispatch(productsActions.toggleFavourite(id));
  };
  if (!selectedProduct) {
    return (
      <InfoScreen
        title="This product was removed."
        subTitle="If you have any questions regarding this product, please reach our custumer service."
        buttonTitle="Shop"
        onPress={() => {
          props.navigation.navigate("Simple Market");
        }}
      />
    );
  }

  return (
    <ScrollView>
      <FavouriteButton
        name={isFavourite ? "star" : "star-outline"}
        onFavourite={() => {
          toggleFavouriteHandler(selectedProduct.id);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ImageScreen", {
            imageUrl: selectedProduct.imageUrl,
          });
        }}
      >
        <Image source={{ uri: selectedProduct.imageUrl }} />
      </TouchableOpacity>
      <Spacer possition="bottom" size="xl" />
      <TopContainer>
        <PriceContainer>
          <HeaderLabel>Price:</HeaderLabel>
          <Price>${selectedProduct.price.toFixed(2)}</Price>
        </PriceContainer>
        <ButtonContainer>
          <BodyButton
            buttonTitle="Buy"
            mode="outlined"
            buttonColor={theme.colors.bg.black}
            style={{ borderColor: theme.colors.bg.grey }}
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          />
        </ButtonContainer>
      </TopContainer>
      <BottomContainer>
        <HeaderLabel>Description:</HeaderLabel>
        <Description>{selectedProduct.description}</Description>
      </BottomContainer>
    </ScrollView>
  );
};
