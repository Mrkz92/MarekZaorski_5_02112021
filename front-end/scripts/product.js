(async function(){
    const productId = getProductId()
    const productData = await getProductData(productId)
    dispatchData(productData)
}) ()

/* Récupération de l'ID produit */
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);

getProductId();
function getProductId() {
    return new URL (location.href).searchParams.get("id")
    // const id = urlSearchParams.get("id")
    // console.log(id)
}

/* Récupération des datas en fonction de l'ID produit */
getProductData();
function getProductData(productId) {
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
        .then(res => res.json())
        .catch(function(err){
            alert("Désolé, l'article ne peut pas être affiché pour l'instant.")
            console.error("Ne fonctionne pas");
        })
}

/* Séléction de la classe HTML accueillant les datas */
const productContainer = document.querySelector(".product-container");

// DISPATCH DATAS
function dispatchData(productData) {
    
    // CREATE PRODUCT CARD
    const productCard = document.createElement("div")
    productCard.classList.add("product-card")
    productContainer.appendChild(productCard)
        
        const productFrame = document.createElement("div")
        productFrame.classList.add("product-frame")
        productCard.appendChild(productFrame)

        const productImage = document.createElement("img")
        productImage.classList.add("product-image")
        productImage.src = productData.imageUrl
        productFrame.appendChild(productImage)
    
        const productInfos = document.createElement("div")
        productInfos.classList.add("product-infos")
        productCard.appendChild(productInfos)

            const productName = document.createElement("h2")
            productName.classList.add("product-name")
            productName.innerHTML = productData.name
            productInfos.appendChild(productName)

            const productDescription = document.createElement("p")
            productDescription.classList.add("product-description")
            productDescription.innerHTML = productData.description
            productInfos.appendChild(productDescription)

            // CREATE FORM SELECTOR
            const optionForm = document.createElement("form")
            optionForm.classList.add("product_option__from")
            productInfos.appendChild(optionForm)

            const label = document.createElement("label")
            label.classList.add("form-label")
            label.innerText = "Choisissez une option"
            optionForm.appendChild(label) 

            const optionSelector = document.createElement("select")
            optionSelector.classList.add("product-option__list")
            optionForm.appendChild(optionSelector)

            // JSON ARRAY
            let optionJson = productData.lenses
            console.log(optionJson)

            // POPULARTE SELECT OPTION
            let select = document.getElementsByClassName("product-option__list")
                for(let i = 0; i < optionJson.length; i++) {
                    let opt = optionJson[i];
                    let el = document.createElement("option");
                    el.innerHTML = opt;
                    el.value = opt;
                    optionSelector.appendChild(el);
                }

            // populateOption()
            // function populateOption(el, optionJson) {
            //         let optionValue = document.getElementsByClassName("product-option")
            //         for (i = 0; i < optionJson.length; i++) {
            //             // POPULATE SELECT ELEMENT WITH JSON.
            //             optionValue.innerText = optionJson[i]
            //             optionValue.value = optionJson[i]
            //             console.log(optionValue);
            //         }
            // }

            const productPrice = document.createElement("p")
            productPrice.classList.add("product-price")
            productPrice.innerHTML = productData.price /100 + `<span>€</span>`
            productInfos.appendChild(productPrice)

            const productOrderButton = document.createElement("button")
            productOrderButton.classList.add("product-order__button")
            productOrderButton.type = "submit"
            productOrderButton.innerHTML = "Ajouter au panier"
            productInfos.appendChild(productOrderButton)
}

