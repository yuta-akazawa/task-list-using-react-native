import firebase from 'firebase';
import 'firebase/firestore';
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

  createTask = ({ title, description, limitDate, status }) => {
    const createdAt = Date.now();
    console.log(title);
    console.log(description);
    console.log(limitDate);
    this.taskCollection.add({
      title,
      description,
      limitDate,
      status,
      createdAt
    });
  };

  getTasks = async () => {
    const tasklist = await this.taskCollection.get();
    const result = [];
    tasklist.forEach(doc => {
      result.push(new Task(doc));
    });
    return result;
  }


  // Helpers
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