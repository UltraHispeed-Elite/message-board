var messages;

function placeMessages(data) {
    let div = document.getElementById("messages");
    let newdata = [];
    for(let i = 0; i < data.data.length; i++) {
        let val = `
        <div>
            <h2>
            `+data.data[i][0]+`
            </h2>
            <p>`+data.data[i][1]+`</p>
        </div>
        `;

        newdata.push(val);
        console.log(val)
    }

    let converteddata = ``;

    for(let i = 0; i < newdata.length; i++) {
        converteddata += newdata[i];
    }

    div.innerHTML = converteddata;
}
  
  async function asyncCall() {
    fetch('http://127.0.0.1:8000/message_list')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Assuming the response is JSON
  })
  .then(data => {
    // Do something with the data
    console.log(data);
    messages = data;
    console.log(messages)
    placeMessages(messages);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  }
  
  asyncCall();

function button() {
        let data = {
            message:document.getElementById("message").value,
            name:document.getElementById("name").value
        }
    post(data)
}

function post(val) {
    fetch("http://127.0.0.1:8000/messaged", {
        method: "POST",
        body: JSON.stringify({
            name: val.name,
            message: val.message
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}