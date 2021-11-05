const allProducts = 'http://localhost:3000/api/cameras';
const productsList = document.getElementById("products-list");

fetch(allProducts)
    .then(res => res.json().then(console.log(res)))
    
    .catch(function(err) {
        console.error(err);
        let productsListError = document.createElement("p");
        productsList.appendChild(productsListError);
        productsList.style.display = "flex";
        productsListError.classList.add("products-list-error");
        productsListError.innerText = "Désolé, les articles ne peuvent être affichés. Veuillez allumer le serveur local.";
    })
    
    .then(function(allProducts) {
        console.log(allProducts)
        for (let product in allProducts) {
            let productCard = document.createElement("div");
            productsList.appendChild(productCard);
            productCard.classList.add("product-card", "g-2", "p-0");
            productCard.style.backgroundColor = "rgba(221, 221, 221, 0.9)";
            productCard.style.border = "solid 1px grey";
            productCard.style.borderRadius = ".5rem";
            productCard.style.overflow = "hidden";

            let productLink = document.createElement("a");
            productCard.appendChild(productLink);
            productLink.href = `product.html?id=${allProducts[product]._id}`;

            let productFrame = document.createElement("div");
            productLink.appendChild(productFrame);
            productFrame.classList.add("product-frame");
            productFrame.style.padding = ".5rem";
            productFrame.style.height = "80%";

            let productImage = document.createElement("img");
            productFrame.appendChild(productImage);
            productImage.src = `${allProducts[product].imageUrl}`;
            productImage.classList.add("product-image");
            productImage.style.border = "solid .1px grey";
            productImage.style.borderRadius = ".5rem";
            productImage.style.width = "100%";
            productImage.style.height = "100%";
            productImage.style.objectFit = "cover";

            let productInfos = document.createElement("div");
            productCard.appendChild(productInfos);
            productInfos.classList.add("product-infos");
            productInfos.style.padding = ".5rem 1.5rem";
            productInfos.style.display = "flex";

            let productName = document.createElement("h5");
            productInfos.appendChild(productName);
            productName.innerText = `${allProducts[product].name}`;
            productName.classList.add("product-name");

            let productPrice = document.createElement("p");
            productInfos.appendChild(productPrice);
            productPrice.innerText = `${allProducts[product].price/100}€`;
            productPrice.classList.add("product-price");
            productPrice.style.marginLeft = "auto";
        }
    })
