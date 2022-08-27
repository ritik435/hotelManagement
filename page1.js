import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, getDoc, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBGcLMBxU4jbTW8pYU2LWLcQMR-8Ki6cJY",
    authDomain: "hotelmanagement-55ff8.firebaseapp.com",
    projectId: "hotelmanagement-55ff8",
    storageBucket: "hotelmanagement-55ff8.appspot.com",
    messagingSenderId: "1000334974838",
    appId: "1:1000334974838:web:fa56216a29c566194f6457",
    measurementId: "G-DTZW2SQNVX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


//date and time
const dateInput = document.getElementById('date');

// Using UTC (universal coordinated time)
dateInput.value = new Date().toISOString().split('T')[0];

dateInput.setAttribute("min", dateInput.value)
// console.log(new Date().toISOString().split('T')[0]);

document.getElementById('contactForm')
    .addEventListener('submit', submitForm);



function submitForm(e) {
    e.preventDefault();
    //current date and time
    var current = new Date();
    var checkIn = current.toLocaleString();
    // Get values
    var name = getInputVal('name');
    var room = getInputVal('room');
    var checkOut = getInputVal('date');

    checkOut = new Date(checkOut).toLocaleString();
    console.log(checkOut);

    saveMessage(name, room, checkIn, checkOut);
    document.getElementById('contactForm').reset();
}



// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}




// Save message to firebase
async function saveMessage(name, room, checkIn, checkOut) {
    try {
        const docRef = doc(db, "hotel", room);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            alert("Already exists");
        } else {
            const messagesRef = collection(db, "hotel")
            await setDoc(doc(messagesRef, room), {
                name: name,
                room: room,
                checkIn: checkIn,
                checkOut: checkOut

            })
                / alert('Successfully registered');
        }
    } catch (e) {
        console.log(e);
    }
}
