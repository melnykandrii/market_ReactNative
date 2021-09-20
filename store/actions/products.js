import Product from "../../models/product";
import storage from "@react-native-firebase/storage";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    // any async code
    try {
      const response = await fetch(
        //"https://shopma-58377-default-rtdb.firebaseio.com/products.json"
        "https://storefilern-default-rtdb.firebaseio.com/products.json"
      );
      if (!response.ok) {
        const errorResponseData = await response.json();
        const errorId = errorResponseData.error.message;
        console.log(errorResponseData);
        let errorMessage = "Something went wrong";
        throw new Error(errorMessage);
      }
      const resData = await response.json();

      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      //send to custom analytics server
      console.log(err);
      throw err;
    }
  };
};

export const deleteProduct = (productId, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const imageRef = storage().refFromURL(imageUrl);
    const fileName = imageRef.path.split("/").pop();
    await storage().ref(`/images/products/${fileName}`).delete();
    try {
      const response = await fetch(
        `https://storefilern-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
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
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const fileName = imageUrl.split("/").pop();
    const imageRef = storage().ref(`/images/products/${fileName}`);
    try {
      await imageRef.putFile(imageUrl, {
        contentType: "image/jpg",
      });
      const url = await imageRef.getDownloadURL();
      const response = await fetch(
        `https://storefilern-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl: url,
            price,
            ownerId: userId,
          }),
        }
      );

      const resData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          description,
          imageUrl: url,
          price,
          ownerId: userId,
        },
      });
    } catch (err) {
      throw new Error("Something went wrong!");
    }
  };
};

export const updateProduct = (
  id,
  title,
  description,
  imageUrl,
  oldImageUrl
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const storedImage = imageUrl.split("/")[0] === "https:";
    let url;
    if (storedImage) {
      url === imageUrl;
    } else {
      const fileName = imageUrl.split("/").pop();
      const imageRef = storage().ref(`/images/products/${fileName}`);
      await imageRef.putFile(imageUrl, {
        contentType: "image/jpg",
      });
      url = await imageRef.getDownloadURL();
      const oldImageRef = storage().refFromURL(oldImageUrl);
      const oldImageFile = oldImageRef.path.split("/").pop();
      await storage().ref(`/images/products/${oldImageFile}`).delete();
    }
    try {
      const response = await fetch(
        //`https://shopma-58377-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
        `https://storefilern-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl: url,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title,
          description,
          imageUrl: url,
        },
      });
    } catch (err) {
      throw new Error("Something went wrong");
    }
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
