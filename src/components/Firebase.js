import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';
import Task from './models/Task';

class Firebase {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyDYanoNRulwzpe0SS-TKglkS35P5_7gM5c",
      authDomain: "task-list-bfb2c.firebaseapp.com",
      databaseURL: "https://task-list-bfb2c.firebaseio.com",
      projectId: "task-list-bfb2c",
      storageBucket: "task-list-bfb2c.appspot.com",
      messagingSenderId: "970218385931"
    });

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  signUp = async (email, password) => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error);
      return false;
    }
    return true;
  };

  login = async (email, password) => {
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error);
      return false;
    }
    return true;
  };

  logout = async () => {
    try {
      const res = await firebase.auth().signOut();
    } catch (error) {
      alert(error);
      return false;
    }
    return true;
  };

  createTask = ({ title, description, limitDate, status }) => {
    const uuid = require('uuid/v4');;
    const id = uuid();
    const createdAt = moment().format('l');
    this.taskCollection.doc(id).set({
      title,
      description,
      limitDate,
      status,
      id,
      createdAt
    });
  };

  deleteById = async id => {
    const delDoc = this.taskCollection.doc(id);
    if (!delDoc) return;
    return await delDoc.delete();
  };

  getTasks = async () => {
    const tasklist = await this.taskCollection
      .orderBy('createdAt', 'asc')
      .get();
    const result = [];
    tasklist.forEach(doc => {
      result.push(new Task(doc));
    });
    return result;
  };


  get userCollection() {
    return firebase.firestore().collection("users");
  }

  get taskCollection() {
    return this.userCollection.doc(this.uid).collection("tasks");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

Firebase.shared = new Firebase();
export default Firebase;