function post(val) {
    fetch("http://127.0.0.1:8000/registerNewAccount", {
        method: "POST",
        body: JSON.stringify({
            fname: val.fname,
            lname: val.lname,
            psswrd: val.psswrd,
            email: val.email
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function activateButton() {
    let data = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        psswrd: document.getElementById("psswrd").value,
        email: document.getElementById("email").value
    }

    post(data);
}