import React from "react";

import { FlatList, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../components/product-item.component";
import { BodyButton } from "../../../components/buttons/button.component";
import { theme } from "../../../infrastructure/theme";

export const ProductsList = (props) => {
  const favProducts = useSelector((state) => state.products.favouriteProducts);

  const renderProductItem = ({ item }) => {
    const isFavorite = favProducts.find((prod) => prod.id === item.id);
    return (
      <ProductItem
        name={isFavorite ? "star" : "star-outline"}
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onSelect={() => props.viewProductHandler(item.id, item.title, { item })}
        toggleFavouriteHandler={() => props.toggleFavouriteHandler(item.id)}
      >
        <BodyButton
          buttonTitle="View"
          buttonColor={theme.colors.text.primary}
          mode="outlined"
          onPress={() => {
            props.viewProductHandler(item.id, item.title, { item });
          }}
          compact="true"
        />
        <BodyButton
          buttonTitle="Order"
          buttonColor={theme.colors.text.primary}
          mode="outlined"
          onPress={() => {
            props.addToCardHandler(item);
          }}
          compact="true"
        />
      </ProductItem>
    );
  };

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.id}
      renderItem={renderProductItem}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.bg.black}
          colors={[theme.colors.ui.primary]}
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
    />
  );
};
