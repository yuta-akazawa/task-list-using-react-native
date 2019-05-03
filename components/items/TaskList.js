'use strict'

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Flatlist,
    TouchableHighlight,
 } from 'react-native';

 class TaskList extends Component {
     _onPress = () => {
         this.props.onPressItem(this.props.index);
     }

     render(){
         const item = this.props.item;
         return(
             <TouchableHighlight 
                onPress={this._onPress}
                underlayColor='#dddddd'
             >
                 <View>
                     <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        </View>
                     </View>
                     <View style={styles.separator} />
                 </View>
             </TouchableHighlight>
         );
     }
 }

 const styles = StyleSheet.create({
    thumb: {
      width: 80,
      height: 80,
      marginRight: 10
    },
    textContainer: {
      flex: 1
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
    },
    price: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#48BBEC'
    },
    title: {
      fontSize: 20,
      color: '#656565'
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10
    },
  });