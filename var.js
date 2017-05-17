var express     	    = require('express');
var app                 = express(),
    mail                = require("nodemailer"),
    bodyParser          = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public" + "/index.html");
})

app.post("/",(req,res)=>{

    var transporter = mail.createTransport({
        service: 'gmail',
        auth: {
            user: 'sunsparksols@gmail.com',
            pass: 'sunspark2017'
        }
    });
    var name = req.body.name,
        email = req.body.email,
        message = req.body.message;
    var mailOptions = {
        from: email + '<sunsparksols@gmail.com>',
        to: 'sunsparksols@gmail.com',
        subject: "from :" + name,
        text: name,
        html: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        // res.send(`<script>alert("Thank u for contacting us....We will respond soon")</script>`);
        res.redirect('/');
});
});

app.listen(process.env.PORT || 5050
  ,()=>{
    console.log("vaaada")
})
