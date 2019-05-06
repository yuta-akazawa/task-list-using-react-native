import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';

const AppStackNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
},
  {
    navigationOptions: {
      header: null,
      tabBarVisible: false,
      title: 'Task List'
    }
  });

const AppNavigator = createAppContainer(AppStackNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
