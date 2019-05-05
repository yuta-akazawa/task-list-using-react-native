'use strict'

import React, { Component } from 'react';
import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';
import { Icon } from 'native-base';

import TaskListTab from './tabs/TaskListTab';
import ProfileTab from './tabs/ProfileTab';
import AddTaskScreen from './AddTaskScreen'

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return <AppContainer />
    }
}

const TaskNavigator = createStackNavigator({
    Tasks: { screen: TaskListTab },
    AddTask: { screen: AddTaskScreen },
},
    {
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Icon name='list' style={{ color: tintColor }} />
            ),
            header: null,
        }
    });

const AppTabNavigator = createBottomTabNavigator({
    Tasks: { screen: TaskNavigator },
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
    });

const AppContainer = createAppContainer(AppTabNavigator);
