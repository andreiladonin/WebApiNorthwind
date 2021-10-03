const URL = "api/Categories";

async function getCategories (url) {
    let req = await fetch (url);
    if( req.ok ) {
        let data =  await req.json();
        return data;
    } 
}


getCategories(URL)
.then((data) => {
    let tbody = document.querySelector('tbody')
    console.log(data)

    data.forEach(element => {
        /* console.log (element["name"]  + " " + element['desc']);  */
        
        let tdName = document.createElement("td");
        tdName.innerText = element["name"];

        let tdDesc = document.createElement("td");
        tdDesc.innerText = element["desc"];

        let tr = document.createElement("tr");
        tr.append(tdName);
        tr.append(tdDesc);

        tbody.append(tr);
    });
});