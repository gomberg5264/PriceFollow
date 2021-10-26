import React from "react";


function ApiTest() {  

    fetch("https://amazon23.p.rapidapi.com/product-details?asin=B01KPUHBK6&country=US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "amazon23.p.rapidapi.com",
            "x-rapidapi-key": "dd202c1837msh93308ae2a9679b6p148b76jsnb5a6398a98c9"
        }
    })
    .then(response => response.json())
    .then(data=>{ console.log(data); })
    .catch(err => {
        console.error(err);
    });

    return (
      <div className="App">
          <h1>Hello World!</h1>
      </div>
    );
}

const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
  }


export default ApiTest;