var add_servers = false;

function add_button(){
    add_servers = true;
    console.log(add_servers);

    adding_server_table();
}

function adding_server_table() {
    if(add_servers = true) {
        let data = document.getElementById("adding_servers");

        data.innerHTML = `
            <h2>Enter your Server name and Address</h2>

            <b>Name: </b>
            <input id="serverName">
            <br>
            <b>Address: </b>
            <input id="serverAddress">
            <br>
            <b>Remember this Server?:</b>
            <input type="checkbox" id="keepServer">
            <br>
            <button onClick="saveServerData()">Add</button>
        `;
    }
}

function saveServerData() {
    let data = {
        serverName: document.getElementById("serverName").value,
        serverAddress: document.getElementById("serverAddress").value,
        keepServer: document.getElementById("keepServer").value
    };

    console.log(data);
    saveToStorage(data);
}

function saveToStorage(data) {
    if(data.keepServer === "on") {
        localStorage.setItem("server_"+data.serverName, JSON.stringify(data));
        addServerList(data.serverName)
    }else {
        sessionStorage.setItem("sever_"+data.serverName, JSON.stringify(data));
    }

    console.log("server has been added");
    check_serverList();
}

function addServerList(name) {
    try{
        let list_data = JSON.parse(localStorage.getItem("server_list"));
        console.log(list_data);
        list_data.push(name)
        localStorage.setItem("server_list", JSON.stringify(list_data));
        console.log("added "+name+" to list");
    }catch(err) {
         let list_data = [name];
         localStorage.setItem("server_list", JSON.stringify(list_data));
         console.log("no list found, created new one");
    }
}