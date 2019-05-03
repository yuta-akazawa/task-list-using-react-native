'use strict'

import React, { Component } from 'react';
import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';

import TaskListTab from './tabs/TaskListTab';
import ProfileTab from './tabs/ProfileTab';
import AddTask from './AddTaskScreen'

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return <AppContainer />
    }
}

const MainTabNavigator = createBottomTabNavigator({
    Tasks: { screen: TaskListTab },
    Profile: { screen: ProfileTab },
},
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true,
        }
    }
);

const AppTabNavigator = createStackNavigator({
    MainScreen: { screen: MainTabNavigator },
    AddTask: { screen: AddTask },
},
    {
        navigationOptions: {
            tabBarVisible: false
        }
    }
);

const AppContainer = createAppContainer(AppTabNavigator);
