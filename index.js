'use strict';

var express         = require('express'),
    bodyParser      = require('body-parser'),
    speakeasy       = require('speakeasy'),
    logger          = require('morgan'),
    _               = require('underscore');


var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

let questions = [{id: 1, heading: "First, we need to know", body: ["Have you ever been sued by a company that says you " +
    "owe them money?", "You should have received a paper named \"Civil Warrant,\" or \"Sworn Account.\"", "The " +
    "\"Civil Warrant\" would say for \"any lawful officer\" to \"summon\" you (with your name on the paper) to appear " +
    "in a court.", "The \"Sworn Account\" should swear that you owe a company money and be signed by that company."],
    buttons:[{name:"Yes", child_id:2}, {name: "No", child_id: 3}]},

    {id: 2, heading: "Do you recognize the debt collector?", body: ["Is the company calling or mailing you one that " +
    "you knew you owed money to?","(Did you have a credit card with them, buy a car from them, or borrow money from " +
    "them?)"], buttons:[{name:"Yes", child_id:4}, {name:"No", child_id:5}]},

    {id: 3, heading: "Do you recognize the debt collector?", body: ["Is the company calling or mailing you one that " +
    "you knew you owed money to?","(Did you have a credit card with them, buy a car from them, or borrow money from " +
    "them?)"], buttons:[{name:"Yes", child_id:4}, {name:"No", child_id:6}]},

    {id: 4, heading: "Debt laws don't apply to your situation, but we can still help you.", body: ["Because the company " +
    "suing you is the one you originally borrowed money from, the debt collection laws do not apply to your debt.",
    "There are ways to lower the amount of money you will need to pay each month. Follow the button below to learn " +
    "about them."], buttons:[{name:"Learn more about lowering your monthly payments", child_id: 7}]},

    {id: 5, heading: "Have you been sued about this debt and lost in court?", body: ["This could happen in a couple " +
    "of ways:", "If you were sued and went to court, and the judge said the company won, then click \"Yes\" and follow " +
    "the instructions", "If you were sued and did not go to court, then click \"Yes\" and follow the instructions",
    "If you went to court and made an agreement with the company suing you, click \"Yes\" and follow the instructions"],
    buttons:[{name:"Yes", child_id:7},{name:"No", child_id:8}]},

    {id: 6, heading: "You have rights!", body:["The law tells bill collectors what they can and can't legally do when " +
    "they try to collect money from you!", "Most importantly, a bill collector must send you proof that they have the " +
    "right to collect your debt! Without that, you should not owe them money.", "Continue on to learn how to stop " +
    "the harassing calls and letters!"], buttons:[{name:"Learn How to Stop Harassing Calls", child_id:9},{name: "Learn " +
    "How to Stop Harassing Letters", child_id: 10}]},

    {id: 7, heading: "You can make your payments affordable!", body: ["You may be able to make the amount of money you " +
    "pay each month smaller. You can file or a Slow Pay application to reduce the amount of money you must pay every" +
    " month. You can also file a Personal Property Exemption to make sure certain pieces of your property can't be " +
    "used to pay off your debt.", "More information can be found in this brochure. You can learn more information " +
    "about Personal Property Exemptions or Slow Pay Motions on the following pages."], buttons: [{name: "Learn " +
    "More About Personal Property Exemptions", child_id: 11}, {name: "Learn More About Slow Pay Motions", child_id: 12}]},

    {id: 8, heading: "We need to know about your property", body: ["You can decide whether you want to go to Court " +
    "and fight the debt. If you have any of the following, you should go to the Court to protect yourself:", "1. Money in " +
    "a bank account", "  2. A car that you own","  3. A home that you own or that is worth more money than you still owe on it",
    "  4. A job that gives you a paycheck (this does not include checks that you get from social security or disability)	",
    "Do you have any of the above?"], buttons:[{name: "Yes", child_id:13}, {name: "No", child_id: 14}]},

    {id: 9, heading: "You can stop their phone calls in your workplace!", body: ["You must ask debt collectors by mail " +
    "to stop their phone calls to your work.", "Download and print the letter below and fill it out to send to the " +
    "harassing collector(you can email the letter to yourself to print on a computer if your phone isn't connected " +
    "to a printer)."], buttons: [{name: "Download Letter"}]},

    {id: 10, heading: "You can stop their letters!", body: ["You must ask them by mail to stop contacting you. If " +
    "you use the letter below, they may only contact you to show proof of what you owe or to tell you they are " +
    "suing you.", "Download, print and fill out the letter below (you can email the letter to yourself to print on " +
    "a computer if your phone is not connected to a printer)."], buttons:[{name: "Download Letter"}]},

    {id: 11, heading: "What is a Personal Property Exemption?", body: ["A Personal Property Exemption is a paper you " +
    "can file with the court to protect certain kinds of property you own from being taken and sold to pay off your " +
    "debt.", "This can save up to $10,000 worth of personal property including money, furniture, cars and other kinds " +
    "of property except for land.", "Talk to the Court Clerk or your local Legal Aid Society office to get more " +
    "information on filing a Personal Property Exemption, which usually costs around $25."], buttons: [{name:"Learn" +
    " More About Slow Pay Motions", child_id: 12}]},

    {id: 12, heading: "What is a Slow Pay Motion?", body: ["If you and the debt collector can't agree to a payment " +
    "plan you can afford, then you can file a paper called a Stay of Garnishment and Slow Pay Motion with the court. " +
    "A clerk at the court can help you file this.", "Once you have filed a Slow Pay Motion, the Clerk will ask you to " +
    "come back to court on a specific day. Before that day you should write down your monthy bills to show the judge, " +
    "like your rent, lights and heat, food and other necessary costs. ", "When you come back to court on the day you " +
    "are told to, the judge will ask you questions about your income and the people you support and decide how much " +
    "you need to pay each month. Make sure you can afford the amount of money you tell the judge you can pay each " +
    "month.", "If an emergency makes you have to miss your court date, call the court and let them know as soon as " +
    "possible! "], buttons: [{name: "Learn More About Personal Property Exemptions", child_id: 11}]},

    {id: 13, heading: "You should go to court.", body: ["If you do not show up, the debt collector will likely take " +
    "money from your bank account or take things you own like your car or your home pay off your debts.", "Do not " +
    "panic!", "There are multiple steps you can take to help ensure this does not happen.", "Before you go to court, " +
    "you should file a Sworn Denial. A Sworn Denial means you don't know if you owe the money to the company saying " +
    "you owe them. It does not mean you don't owe them money. It means you want them to prove you owe the money.", "You " +
    "can write a letter to the collector to determine what debt they are talking about if you are unsure.", "There " +
    "are some things you should know about when you go to court. Follow the button below to find out more about the " +
    "process of representing yourself in court."], buttons: [{name:"Tell Me More About a Sworn Denial",
        child_id: 15}, {name:
    "Tell Me More About Writing a Letter", child_id: 16}, {name: "Tell Me More About Going to Court", child_id: 17}]},

    {id: 14, heading: "Consider using a Personal Property Exemption", body: ["Even though you do not have any of the " +
    "things on the previous page that a collector could take to pay off your debt, it's smart and safe to file a " +
    "Personal Property Exemption.", "A Personal Property Exemption is a paper you can file with the court to protect " +
    "certain kinds of property you own from being taken and sold to pay off your debt.", "This can save up to $10,000 " +
    "worth of personal property including money, furniture, cars and other kinds of property.", "Talk to the Court " +
    "Clerk or your local Legal Aid Society office to get more information on filing a Personal Property Exemption " +
    "which usually costs around $25."], buttons:[]},

    {id: 15, heading: "Sworn Denials", body:["A Sworn Denial tells the Court that you deny owing the debt to the " +
    "person or company trying to collect on it and that you demand proof that you owe the debt.", "You can download " +
    "and print the letter below to use as a Sworn Denial at the Courthouse. (You can email the letter to yourself " +
    "after downloading it if your phone isn't connected to a computer).", "DO NOT FILL OUT THE LETTER UNLESS you are " +
    "in front of a notary! If you do not know where to find a notary, take your Sworn Denial to the Courthouse. " +
    "The Clerks there can sign as notaries. ", "Add pdf here."], buttons:[]},

    {id: 16, heading: "Writing a Letter", body:["Use the Letter below to demand the debt collector show proof of your debt and " +
    "clarify what exactly it is you owe if you do not remember owing the money. You can download and print the letter " +
    "from this app, or you can email the letter to yourself if your phone isn't connected to a printer.", "This letter " +
    "will also tell the collector to stop contacting you about the debt for any reason other than to explain the debt " +
    "that you owe and why you owe it."], buttons:[]},

    {id: 17, heading: "What to expect in court", body: ["Once in court, it's important that you know that debt " +
    "collectors MUST prove to the judge that they have the right to collect your debt that you owed to another company.",
    "At Court, ask the judge for the following papers: ", "The contract you signed, showing everything you agreed " +
        "to, like the late fees and interest rates."], buttons:[]}];

// Handle POST to create a new user account
app.post('/v1/user', function(req, res) {
    res.status(200).send();
});


// Handle GET to fetch a question
app.get('/question', function(req, res) {
    let id = req.query.id ? req.query.id.toLowerCase() : '';
    let questionData = req.body;

    if (true) {
        res.render('question', {
            question: questions[id - 1]
        });
    } else {
        res.status(404).send('');
    }
});

var server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});