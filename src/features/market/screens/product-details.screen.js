import * as cartActions from "../../../../store/actions/cart";
import * as productsActions from "../../../../store/actions/products";
import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../infrastructure/theme";
//import { BodyButton } from "../../../components/buttons/body.button.component";
import { BodyButton } from "../../../components/buttons/button.component";
import { Spacer } from "../../../components/typography/spacer/spacer.component";
import { CloseButton } from "../../../components/buttons/close.button.component";
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

export const ProductDetailsScreen = (props) => {
  const prodId = props.route.params.productId;
  const { item } = props.route.params;
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
      <CloseButton
        name={isFavourite ? "star" : "star-outline"}
        onClose={() => {
          toggleFavouriteHandler(selectedProduct.id);
        }}
        style={{
          position: "absolute",
          zIndex: 9,
          top: 10,
          right: 10,
        }}
        buttonColor={theme.colors.bg.primary}
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
