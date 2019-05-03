'use strict'

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
 } from 'react-native';
import {Icon} from 'native-base';

export default class ProfileTab extends Component {
    static navigationOptions = {
        title:'A',
        tabBarIcon: ({tintColor}) => (
            <Icon name='person' style= {{ color: tintColor }} />
          )
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>ProfileTab</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
    }
});