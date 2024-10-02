async function retrieve_server_list() {
    let table = document.getElementById("server_list"); 
    table.innerHTML = "<div></div>"
    try {
        let list = JSON.parse(localStorage.getItem("server_list"));
        for(let i = 0; i < list.length; i++) {
            table.innerHTML += `
            <div>
                <h2>`+list[i]+`</h2>
            </div>
            `;
        }
    }catch(err) {
        table.innerHTML += `<h2> No Servers Available </h2>`
    }
}

async function check_serverList() {
    retrieve_server_list();
}