const URL = "api/Categories";

async function getApi (url) {
    let req = await fetch (url);
    if( req.ok ) {
        let data =  await req.json();
        return data;
    } 
}


getApi(URL)
.then((data) => {
    let tbody = document.querySelector('tbody')
    /* console.log(data)
 */
    data.forEach(element => {
        /* console.log (element["name"]  + " " + element['desc']);  */
        let tdId = document.createElement("td");
        tdId.innerText = element["id"];

        let tdName = document.createElement("td");
        tdName.innerText = element["name"];

        let tdDesc = document.createElement("td");
        tdDesc.innerText = element["desc"];

        let tr = document.createElement("tr");
        tr.append(tdId)
        tr.append(tdName);
        tr.append(tdDesc);

        tbody.append(tr);
    });
});

getApi("api/product")
.then((data) => {
    let tbody = document.querySelector('#products')

    data.forEach(element => {
        let tdId = document.createElement("td");
        tdId.innerText = element["id"];

        let tdName = document.createElement("td");
        tdName.innerText = element["name"];

        let tdCategory = document.createElement("td");
        tdCategory.innerText = element["category_name"];

        let tdCompany = document.createElement("td");
        tdCompany.innerText = element["supplier_name"];

        let tr = document.createElement("tr");
        tr.append(tdId)
        tr.append(tdName);
        tr.append(tdCategory);
        tr.append(tdCompany);

        tbody.append(tr);
    });
});

async function append_category(categories) {
    let response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(categories)
    });
    let result = await response.json();
    return result;
}

document.querySelector("#btn-submit").addEventListener("click", () => {

     let name_category = document.querySelector("#name_category").value;
     let desc_category = document.querySelector("#desc_category").value;
    
     let categories = {
         "CategoryName": name_category,
         "Description": desc_category
     }
     
     if(name_category == "" || desc_category == "") {
         alert("Введите значения");
     } else{

        append_category(categories).then((result)=> {
            alert("ok");
            window.location.reload();
        })
     }
})