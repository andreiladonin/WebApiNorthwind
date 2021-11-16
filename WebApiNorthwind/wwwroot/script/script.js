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
    let categories = document.querySelector('#categotry-list')

    data.forEach(element=> {
        categories.innerHTML += `<option value="${element['id']}">${element['name']}</option>`
    });


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

getApi("api/products")
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

        let tdDellete = document.createElement('td')
        tdDellete.innerHTML =   `<button class="product_dellete" value='${element["id"]}'>Dellete</button>`
        
        let tr = document.createElement("tr");
        tr.append(tdId)
        tr.append(tdName);
        tr.append(tdCategory);
        tr.append(tdCompany);

        tr.append(tdDellete);

        tbody.append(tr);
    });
});

async function append_category(url,categories) {
    let response = await fetch(url, {
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

        append_category(URL, categories).then((result)=> {
            window.location.reload();
        })
     }
})

document.querySelector("#btn-submit-product").addEventListener("click", () => {

    let name_product = document.querySelector("#name_product").value;

    let category_id = document.querySelector("#categotry-list").value;
    let company_id = document.querySelector("#companies-list").value;
   
    let product = {
        "ProductName": name_product,
        "SupplierId": company_id,
        "CategoryId": category_id
        
    }

    append_category("api/products", product).then((result)=> {
        window.location.reload();
    })
})


getApi("api/company")
.then((data) => {
    let companies = document.querySelector('#companies-list')

    data.forEach(element => {
        companies.innerHTML += `<option value="${element['id']}">${element['company']}</option>`
    });
});


async function dellete_product(id){

    let req = await fetch("api/products/"+id,
        {
            method: "DELETE"})

    if (req.ok) {
        return await 200;
    }
    else {
        return await req.status;
    }
}


document.querySelector('#products').addEventListener('click', (e)=> {

    if(e.target.tagName != "BUTTON") {
        return
    }

    let response = dellete_product(e.target.value);
    response.then(result => {
        if (result == 200) {
            window.location.reload()
        } else {
            alert("Conflict Status 409");
        }
    })

})