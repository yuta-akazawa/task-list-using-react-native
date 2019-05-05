'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Container,
    Header,
    Button,
    Content,
    Item,
    Input,
    DatePicker,
    Body,
    Title,
    H2,
} from 'native-base';
import moment from 'moment';
import Firebase from './Firebase';

export default class AddTaskModalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            limitDate: moment().format('l'),
            status: false,
        }
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        const limitDate = moment(newDate).format('l');
        this.setState({ limitDate: limitDate });
    }

    async createTask() {
        const { title, description, limitDate, status } = this.state;
        if (title != '') {
            const task = {
                title,
                description,
                limitDate,
                status
            }
            await Firebase.shared.createTask(task);
            this.props.navigation.goBack();
        } else {
            alert('Title is empty, Please type Title.');
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <View>
                    <H2 style={styles.h2}>Type new Task</H2>
                </View>
                <Content>
                    <Item>
                        <Input
                            placeholder='title'
                            onChangeText={title => this.setState({ title })}
                        >
                        </Input>
                    </Item>
                    <Item>
                        <Input
                            placeholder='description'
                            onChangeText={(description) => this.setState({ description })}
                        >
                        </Input>
                    </Item>
                    <Item>
                        <DatePicker
                            defaultDate={new Date()}
                            locale={'jp'}
                            androidMode={'default'}
                            animationType={'slide'}
                            placeHolderText={'Select limit Date'}
                            onDateChange={this.setDate}
                            disabled={false}
                            textStyle={{ color: '#CCCCCC' }}
                        />
                    </Item>
                    <Button
                        style={styles.button}
                        full
                        rounded
                        info
                        onPress={() => this.createTask()}
                    >
                        <Text style={styles.buttonText} >Add Task</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    header: {
        flex: 1,
    },
    button: {
        margin: 20,
    },
    buttonText: {
        color: '#fff'
    },
    datePickerText: {
        color: '#C0C0C0'
    },
    h2: {
        alignItems: 'center',
        margin: 10,
    }
});