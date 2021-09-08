import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductEditScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>ProductEditScreen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductEditScreen;