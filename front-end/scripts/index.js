const cameras = 'http://localhost:3000/api/cameras';
const productsList = document.getElementById("products-list");

fetch(cameras)
    .then(function(res) {
        console.log("Les infos ont bien été récupérées");
        return res.json();
    })
    .catch(function(err) {
        alert('Désolé, les articles ne peuvent être affichés suite à un problème serveur.')
        console.error("Serveur local éteint, les infos n'ont pas pu être récupérées");
    })
    
    .then(function (cameras) {
        console.log(cameras)
        for (let productsItem in cameras) {
            let productCard = document.createElement("div");
            productsList.appendChild(productCard);
            productCard.classList.add("product-card", "g-2", "p-0");
            productCard.style.backgroundColor = "rgba(221, 221, 221, 0.9)";
            productCard.style.border = "solid 1px grey";
            productCard.style.borderRadius = ".5rem";
            productCard.style.overflow = "hidden";

            let productLink = document.createElement("a");
            productCard.appendChild(productLink);
            productLink.href = `../html/product.html?id=${cameras[productsItem]._id}`;

            let productFrame = document.createElement("div");
            productLink.appendChild(productFrame);
            productFrame.classList.add("product-frame");
            productFrame.style.padding = ".5rem";
            productFrame.style.height = "80%";

            let productImage = document.createElement("img");
            productFrame.appendChild(productImage);
            productImage.src = `${cameras[productsItem].imageUrl}`;
            productImage.classList.add("product-image");
            productImage.style.border = "solid .1px grey";
            productImage.style.borderRadius = ".5rem";
            productImage.style.width = "100%";
            productImage.style.height = "100%";
            productImage.style.objectFit = "cover"

            let productInfos = document.createElement("div");
            productCard.appendChild(productInfos);
            productInfos.classList.add("product-infos");
            productInfos.style.padding = ".5rem 1.5rem";
            productInfos.style.display = "flex";

            let productName = document.createElement("h5");
            productInfos.appendChild(productName);
            productName.innerText = `${cameras[productsItem].name}`;
            productName.classList.add("product-name");

            let productPrice = document.createElement("p");
            productInfos.appendChild(productPrice);
            productPrice.innerText = `${cameras[productsItem].price/100}€`;
            productPrice.classList.add("product-price");
            productPrice.style.marginLeft = "auto";
        }
    })
