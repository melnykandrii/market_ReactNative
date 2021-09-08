import * as cartActions from '../../store/actions/cart';

import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import React from 'react';

const ProductDetailsScreen = props => {
const prodId = props.route.params.productId;
const selectedProduct = useSelector(state => 
    state.products.availableProducts.find(prod => prod.id === prodId)
);
const dispatch = useDispatch();


    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.buttonCont}>
                <Button color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios}  title="Add to Cart" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }} />
            </View>
            <Text style={styles.price}>$ {selectedProduct.price. toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width:"100%",
        height: 300
    },
    buttonCont: {
        marginVertical: 10,
        alignItems:'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.headdroid,
        textAlign:'center',
        marginVertical: 10
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign:'center',
        marginHorizontal: 20
    }
});

export default ProductDetailsScreen;