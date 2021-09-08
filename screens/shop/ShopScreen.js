import * as cartActions from '../../store/actions/cart';

import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProducItem';
import React from 'react';

const ShopScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
    <FlatList 
        data={products} 
        keyExtractor={item => item.id} 
        renderItem={itemData => (
            <ProductItem 
                image={itemData.item.imageUrl} 
                title={itemData.item.title} 
                price={itemData.item.price} 
                onViewDetails={() => {
                    props.navigation.navigate('Product Details', {
                    productId:itemData.item.id,
                    productTitle:itemData.item.title
                    });
                }} 
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                }} 
            />
        )} 
    />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ShopScreen;