import Colors from '../constants/Colors';
import { HeaderButton } from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import React from 'react';

const DefaultHeaderButton = props => {
    return (
        <HeaderButton 
            {...props} 
            IconComponent={Ionicons} 
            iconSize={23} 
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
        />
    );
};
export default DefaultHeaderButton;