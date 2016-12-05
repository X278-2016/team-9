/**
 * Created by ashleypeck on 11/5/16.
 */

let questionTree = [{id: 1, text: "Have you been sued by a company who says you owe them money? This means recieving a" +
                    " sworn account or affadavit in the mail", yes_child_id: 2, no_child_id: 2},
                    {id: 2, text: "Is this company that you have received calls from one that you know that you owe money to?",
                     yes_child_id: 3, no_child_id: 4},
                    {id: 3, text:"Unfortunately, our program can only help persons being contacted or sued by debt collection agencies"},
                    {id: 4, text:"Are you being sued?", yes_child_id: 5, no_child_id:6},
                    {id: 5, text:"Has there already been a judgement against you and now you have to pay?", yes_child_id: 7,
                    no_child_id: 8},
                    {id: 6, text:"Even though you aren't being sued, you can stop the harassment! See contact instructions"},
                    {id: 7, text:"You can lower the amount you have to pay monthly"},
                    {id: 8, text:"Whether or not you have to go to court depends on whether you have any of the following: " +
                    "money in a bank account, a car that you own, a home that you own or have made most of the payments on, " +
                    "a job that issues you a paycheck. Do you have any of the above", yes_child_id: 9, no_child_id:10},
                    {id: 9, text:"You need to go to court"},{id: 10, text: "You are judgement? proof and do not need to go to court"}];

function getQuestion(idNum) {
    for (let i = 0; i < questionTree.length; i++) {
        if (questionTree[i].id == idNum) {
            return questionTree[i].text;
        }
    }
    return "";
}

function onLoad() {
    let q1text = getQuestion(1);
    let mDiv = document.getElementById("q1");
    mDiv.innerHTML = q1text;
    mDiv.className = "bg-success";

    let buttonY = document.createElement("BUTTON");
    var t = document.createTextNode("YES");
    buttonY.appendChild(t);
    document.getElementById("buttons").appendChild(buttonY);

    let buttonN = document.createElement("BUTTON");
    var t2 = document.createTextNode("NO");
    buttonN.appendChild(t2);
    
    document.getElementById("buttons").appendChild(buttonN);
}
