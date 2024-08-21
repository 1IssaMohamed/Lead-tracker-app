// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js"
import { getDatabase,
    ref,
    push,
    onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL: "https://leads-tracker-app-2dad2-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// from the intialized app, we can then connect our databse!
const database = getDatabase(app)
// creats a refrence by using the refrence that we imported from the database like + the database itself
const refrenceInDB= ref(database, "leads")

const inputBtn=document.getElementById("input-btn")
const delEl=document.getElementById("delete-btn")
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("unordered-list")

function render(leads){
    let listItems = ""
    for(let i=0; i< leads.length;i++){
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = listItems  
    }

delEl.addEventListener("dblclick",function(){
    ulEl.innerHTML=""
    remove(refrenceInDB)
})

inputBtn.addEventListener("click", function() {
    // utilizign the database refrence inorder that I created earlier inorder to push my input into the databse
    push(refrenceInDB,inputEl.value)
    .then(() => {
        console.log("Data pushed successfully");
    })
    .catch((error) => {
        console.error("Error pushing data:", error);
    });
    inputEl.value = ""
})
//onValue checks for any changes that happen in the database and automatically does whatevers in the function
// similar to addEventListener("cahnge",x)
onValue(refrenceInDB,function(snapshot){
    if(snapshot.exists()){
        const snapshotValues=snapshot.val()
        const leads=Object.values(snapshotValues)
        console.log(leads)
        render(leads)
    }
})

inputEl.addEventListener("keydown", function(event){
    if(event.key=="Enter"){
        inputBtn.click();
    }
})



