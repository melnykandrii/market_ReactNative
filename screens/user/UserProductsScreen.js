import { Alert, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProducItem";
import { BodyButton } from "../../src/components/buttons/body.button.component";
import { theme } from "../../src/infrastructure/theme";
import { InfoScreen } from "../../src/components/info/info-screen.component";
import { LoadingState } from "../../src/components/loading/loading-state.component";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = (props) => {
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

  const editProductHandler = ({ item }, id, title) => {
    props.navigation.navigate("Edit Product", {
      item: item,
      productId: id,
      productTitle: title,
      edit: true,
    });
  };

  const deleteHandler = (id, image) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id, image));
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
        onNavi={loadProducts}
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
        buttonIcon="database-plus"
        compact="true"
        onNavi={() => {
          props.navigation.navigate("Edit Product");
        }}
      />
    );
  }
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            editProductHandler({ item }, item.id, item.title);
          }}
        >
          <BodyButton
            title="Edit"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onNavi={() => {
              editProductHandler({ item }, item.id, item.title);
            }}
            buttonIcon="square-edit-outline"
            style={styles.button}
          />
          <BodyButton
            title="Delete"
            buttonColor={theme.colors.ui.primary}
            mode="outlined"
            onNavi={() => {
              deleteHandler(item.id, item.imageUrl);
            }}
            buttonIcon="trash-can"
            style={styles.button}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
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

export default UserProductsScreen;
