import {
  Alert,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../components/product-item.component";
import { theme } from "../../../infrastructure/theme";
import { InfoScreen } from "../../../components/info/info-screen.component";
import { LoadingState } from "../../../components/loading/loading-state.component";
import * as productsActions from "../../../services/store/actions/products";
import { CloseButton } from "../../../components/buttons/close.button.component";

export const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userProducts = useSelector((state) => state.products.userProducts);
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

  const editProductHandler = ({ item }, id, title) => {
    props.navigation.navigate("Edit Product", {
      item: item,
      productId: id,
      edit: true,
    });
  };

  const deleteHandler = (id, image) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setError(null);
          setIsLoading(true);
          try {
            await dispatch(productsActions.deleteProduct(id, image));
          } catch (err) {
            setError(err.message);
          }
          setIsLoading(false);
        },
      },
    ]);
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

  if (!isLoading && userProducts.length === 0) {
    return (
      <InfoScreen
        title="You don't have any product yet."
        subTitle="After adding one it will appear here. Tap on the button to start adding."
        buttonTitle="Add Product"
        compact="true"
        buttonContant={styles.btContant}
        onPress={() => {
          props.navigation.navigate("Edit Product");
        }}
      />
    );
  }
  return (
    <FlatList
      numColumns={2}
      horizontal={false}
      data={userProducts}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.bg.black}
          colors={[theme.colors.ui.primary]}
          refreshing={isLoading}
          onRefresh={loadProducts}
        />
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          cardStyle={styles.card}
          styleTitleLabel={styles.titleLabel}
          stylePrice={styles.price}
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            editProductHandler({ item }, item.id);
          }}
          onShow={true}
        >
          <CloseButton
            buttonColor={theme.colors.text.primary}
            onClose={() => {
              editProductHandler({ item }, item.id);
            }}
            name="square-edit-outline"
            size={18}
          />
          <CloseButton
            buttonColor={theme.colors.text.primary}
            onClose={() => {
              deleteHandler(item.id, item.imageUrl);
            }}
            name="trash-can"
            size={18}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width / 2.5,
    height: Dimensions.get("screen").width / 3,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 8,
  },
  titleLabel: {
    fontSize: 10,
  },
});
