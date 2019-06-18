const makeRequest = (method, url, body) => {
   
    return new Promise ( (res, rej) => {
        const req = new XMLHttpRequest();

        req.onload = () => {
            if (req.status >= 200 && req.status <= 299) {
                res(req);
            } else {
                const reason = new Error("Rejected");
                rej(reason);
            }

        }
        req.open(method, url);
        req.send(body);
    }
    
    );
}

const getAllIngredients = () => {
    // removes any existing tables
    const tableContainer = document.getElementById('ingredientTable');
    if (tableContainer.rows.length > 1) {
        let tableSize = tableContainer.rows.length;
        for (i = tableSize; i > 1; i--) {
            tableContainer.deleteRow(i - 1);
        }
    }
    makeRequest("GET", "http://localhost:8080/BakingInventory/api/ingredient/getAllIngredients")
    .then( (req) => {
        let data = JSON.parse(req.responseText);
        console.log(data);
        console.log(data[0].name);

        const tableContainer = document.getElementById('ingredientTable');
        tableContainer.className = "table table-hover"; //bootstrap
      
        // creating table rows and adding data into the rows
        for (let i = 0; i < data.length; i++) {
            let aRow = document.createElement('tr')
            tableContainer.appendChild(aRow);

            let anIngredientId = document.createElement('td');
            anIngredientId.innerHTML = data[i].ingredientId;
            let aName = document.createElement('td');
            aName.innerHTML = data[i].name;
            let aCategory = document.createElement('td');
            aCategory.innerHTML = data[i].category;
            let aQuantity = document.createElement('td');
            aQuantity.innerHTML = data[i].quantity;
            let aThreshold = document.createElement('td');
            aThreshold.innerHTML = data[i].threshold;
            let anExpiryDate = document.createElement('td');
            anExpiryDate.innerHTML = data[i].expiryDate;

            aRow.appendChild(anIngredientId);
            aRow.appendChild(aName);
            aRow.appendChild(aCategory);
            aRow.appendChild(aQuantity);
            aRow.appendChild(aThreshold);
            aRow.appendChild(anExpiryDate);
        }
    })
    .catch((error) => {console.log(error.message)});
    
} 

const getAnIngredient = () => {
    let ingredientToSearch = document.getElementById('idIngredient').value;
    
    // removes any existing tables
    const tableContainer = document.getElementById('ingredientTable');
    if (tableContainer.rows.length > 1) {
        let tableSize = tableContainer.rows.length;
        for (i = tableSize; i > 1; i--) {
            tableContainer.deleteRow(i - 1);
        }
    }


    makeRequest("GET", "http://localhost:8080/BakingInventory/api/ingredient/getAnIngredient/" + ingredientToSearch)
    .then((req) => {
        data = JSON.parse(req.responseText);
        console.log(data);
        console.log(data.name);
        const tableContainer = document.getElementById('ingredientTable');
        tableContainer.className = "table table-hover";

        let aRow = document.createElement('tr');
        tableContainer.appendChild(aRow);

        let anIngredientId = document.createElement('td');
        anIngredientId.innerHTML = data.ingredientId;
        let aName = document.createElement('td');
        aName.innerHTML = data.name;
        let aCategory = document.createElement('td');
        aCategory.innerHTML = data.category;
        let aQuantity = document.createElement('td');
        aQuantity.innerHTML = data.quantity;
        let aThreshold = document.createElement('td');
        aThreshold.innerHTML = data.threshold;
        let anExpiryDate = document.createElement('td');
        anExpiryDate.innerHTML = data.expiryDate;

        aRow.appendChild(anIngredientId);
        aRow.appendChild(aName);
        aRow.appendChild(aCategory);
        aRow.appendChild(aQuantity);
        aRow.appendChild(aThreshold);
        aRow.appendChild(anExpiryDate);
    })
    .catch((error) => {console.log(error.message)});


}

const addIngredient = () => {
    let ingrName = document.getElementById('ingrName').value;
    let ingrCategory = document.getElementById('ingrCategory').value;
    let ingrQuantity = document.getElementById('ingrQuantity').value;
    let ingrThreshold = document.getElementById('ingrThreshold').value;
    let ingrExpiryDate = document.getElementById('ingrExpiry').value;

    const ingrObject = {
        n        quantity: ingrQuantity,
        threshold: ingrThreshold,
        expiryDate: ingrExpiryDate,
    } 

    let ingrJSON = JSON.stringify(ingrObject);

    makeRequest("POST", "http://localhost:8080/BakingInventory/api/ingredient/addIngredient", ingrJSON)
    .then((req) => {
        console.log(ingrJSON);
    })
    .catch((error) => {console.log(error.message)});

}

const removeIngredient = () => {
    let ingredientToRemove = document.getElementById('idIngredient').value;
    makeRequest("DELETE", "http://localhost:8080/BakingInventory/api/ingredient/removeIngredient/" + ingredientToRemove)
    .then( (req) => {
        console.log(req.responseText);
    })
    .catch((error) => { console.log(error.message) })

}

const updateIngredient = () => {
    let ingredientToUpdate = document.getElementById('idIngredient').value;
    makeRequest("PUT", "http://localhost:8080/BakingInventory/api/ingredient/updateIngredient/" + ingredientToUpdate)
    .then((req) => {
        console.log(req.responseText);
    }


    )
}



