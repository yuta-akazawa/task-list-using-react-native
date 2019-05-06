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
import LoginScreen from './LoginScreen';

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
            title: 'List'
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
            showLabel: true,
            showIcon: true,
        },
        navigationOptions: {
            header: null,
        }
    });

const MainNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: AppTabNavigator }
},
    {
        navigationOptions: {
            header: null,
        }
    });

const AppContainer = createAppContainer(MainNavigator);
