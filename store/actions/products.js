import Product from "../../models/product";
import storage from "@react-native-firebase/storage";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    // any async code
    try {
      const response = await fetch(
        //"https://shopma-58377-default-rtdb.firebaseio.com/products.json"
        "https://storefilern-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = (productId, imageUrl) => {
  return async (dispatch) => {
    const imageRef = storage().refFromURL(imageUrl);
    const fileName = imageRef.path.split("/").pop();
    await storage().ref(`/images/products/${fileName}`).delete();
    try {
      const response = await fetch(
        `https://storefilern-default-rtdb.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      dispatch({ type: DELETE_PRODUCT, pid: productId });
    } catch (err) {
      throw new Error("Something went wrong while deleting the item");
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const filename = imageUrl.split("/").pop();
    const imageRef = storage().ref(`/images/products/${filename}`);
    await imageRef.putFile(imageUrl, {
      contentType: "image/jpg",
    });
    const url = await imageRef.getDownloadURL();
    console.log(url);
    // any async code
    const response = await fetch(
      //"https://shopma-58377-default-rtdb.firebaseio.com/products.json",
      "https://storefilern-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Cotent-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl: url,
          price,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl: url,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};

export const toggleFavorite = (id) => {
  return {
    type: TOGGLE_FAVORITE,
    pid: id,
  };
};

export const setFilters = (filterSettings) => {
  return {
    type: SET_FILTERS,
    filters: filterSettings,
  };
};
