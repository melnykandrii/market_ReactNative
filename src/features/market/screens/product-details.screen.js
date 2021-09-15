import * as cartActions from "../../../../store/actions/cart";
import * as productActions from "../../../../store/actions/products";
import { ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../../../infrastructure/theme";
import { BodyButton } from "../../../components/buttons/body.button.component";
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

export const ProductDetailsScreen = (props) => {
  const prodId = props.route.params.productId;

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === prodId)
  );
  //console.log(filename);
  //const currentProductIsFavorite = useSelector(state => state.products.favoriteProducts.some(prod => prod.id === prodId));

  const dispatch = useDispatch();
  /*
const toggleFavoriteHandler = useCallback(() => {
    dispatch(productActions.toggleFavorite(prodId));
}, [dispatch, prodId]);

useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
},[toggleFavoriteHandler]);

useEffect(() => {
    props.navigation.setParams({isFav: currentProductIsFavorite});
},[currentProductIsFavorite]);*/

  return (
    <ScrollView>
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
            title="Buy"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onNavi={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
            buttonIcon="cart-plus"
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
