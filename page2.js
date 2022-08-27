// console.log("page2");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDocs, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


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


const querySnapshot = await getDocs(collection(db, "hotel"));
querySnapshot.forEach((doc) => {

    var currentDate = new Date();
    var oldDate = new Date(doc.data().checkIn);
    // var checkOut = new Date(doc.data().checkOut);
    var checkOut = new Date(doc.data().checkOut);
    var timeAfter = Math.floor(getDifferenceInDays(checkOut, currentDate));


    var timeAgo = Math.floor(getDifferenceInMinutes(currentDate, oldDate));
    function getDifferenceInMinutes(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60);
    }
    function getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    }


    // afterTime = timeSince(new Date(dateTimeInSeconds - doc.data().current.nanoseconds / 1000));
    const child = document.createElement("tr");
    child.innerHTML = `<td>${doc.data().room}</td>
        <td>${doc.data().name}</td>
        <td>${doc.data().checkIn}</td>
        <td>${timeAgo} mins ago</td>
        <td>${doc.data().checkOut}</td>
        <td>After ${timeAfter} days</td>`;
    document.getElementById("table").append(child)
});