const express = require("express");

const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set Static Path
app.use(express.static(path.join(__dirname,'client')));



app.use(bodyParser.json())
const publicVapidKey = 'BJR5CeAlxqrGFHvtfAZ0LRz7iZyLFQmARPA7w5Ma_MXHCN7gOAh9D26dKLJsQXDAzjSVxMnDq1RSOm8mb46buAA';

const privateVapidKey = 'hmqE_x1DDNVOVahWexNl7i1ISbkmvzRlZIWUy9GEHKY';

webpush.setVapidDetails("mailto:pushpendra.hpx2001@gmail.com",publicVapidKey,privateVapidKey);

app.post(
    '/subscribe',
    (req,res)=>{
        // Get Subscription Object
        const subscription = req.body;

        // send 201- resource craeted

        res.status(201).json({});

        // CReate PayLoad
        const payload = JSON.stringify({
            title:"Your Electricity Consumption Reached Limit",
            body:'You have total bill of pending Amount Rs. 3454',
            icon:'https://github.com/fluidicon.png'

        })

        // Pass object into sendNOtification ()
        webpush.sendNotification(subscription,payload).catch(err=>{
            console.log(err);
        });
    }
)


const port = 5003;
app.listen(port,()=>{
    console.log("PORT Started"+port)
})