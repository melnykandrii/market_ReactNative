import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_FILTERS,
  SET_PRODUCTS,
  TOGGLE_FAVOURITE,
  UPDATE_PRODUCT,
  SET_FAVOURITES,
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
  favouriteProducts: [],
  filteredProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
        favouriteProducts: state.favouriteProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
    case TOGGLE_FAVOURITE:
      const prodIndex = state.favouriteProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      if (prodIndex >= 0) {
        const updateFavProd = [...state.favouriteProducts];
        updateFavProd.splice(prodIndex, 1);
        return { ...state, favouriteProducts: updateFavProd };
      } else {
        const favProd = state.availableProducts.find(
          (prod) => prod.id === action.pid
        );
        return {
          ...state,
          favouriteProducts: state.favouriteProducts.concat(favProd),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredProducts = state.availableProducts.filter(
        (product) => {
          if (appliedFilters.clothes && !product.isClothes) {
            return false;
          }
          if (appliedFilters.electronic && !product.isElectronic) {
            return false;
          }
          if (appliedFilters.book && !product.isBook) {
            return false;
          }
          if (appliedFilters.homeDeco && !product.isHomeDeco) {
            return false;
          }
          if (appliedFilters.office && !product.isOffice) {
            return false;
          }
          return true;
        }
      );
      return { ...state, filteredProducts: updatedFilteredProducts };
    default:
      return state;
  }
};
