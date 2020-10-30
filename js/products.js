const ORDER_ASC_BY_COST = "$";
const ORDER_DESC_BY_COST = "$$";
const ORDER_BY_PROD_REL = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

//inicio funcion para ordenar el array de productos
function sortProducts(criteria, array){
 let result = [];
 if (criteria === ORDER_ASC_BY_COST){ //si ordeno en ascendente por coste comparo los valores de coste del producto y los recorro uno a uno, si
     result = array.sort(function(a, b) {
         if ( a.cost < b.cost ) { return -1;}//el coste de a es menor a b regreso -1, lo que manda el objeto del array para atras
         if ( a.cost > b.cost) {return 1;} //si el coste de a es mayor a b regreso 1, lo que manda el objeto para adelante
         return 0; //si son iguales no se modifica
    }); 
 } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) { //aqui aplica la misma logica que arriba pero invertida para tener un orden descendente
        if ( a.cost > b.cost ){return -1;}
        if ( a.cost < b.cost ){return 1; }
        return 0;
    }); 
 } else if (criteria === ORDER_BY_PROD_REL){ //si quiero ordenar por ascendente en producto vendido utilizo la misma funcion que en el inicio pero tomo el soldcount
     result = array.sort(function(a, b) {
         let aCount = parseInt(a.soldCount); //un detalle del soldcount es que tengo que convertir el valor a integer
         let bCount = parseInt(b.soldCount);

         if (aCount > bCount) {return-1;} //luego de eso solo es la misma logica que el primer criterio
         if (aCount < bCount) {return 1;}
         return 0;
     });
    }
    return result; //y regreso el resultado
  }

var productsArray = [];
showSpinner();

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
 
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
        htmlContentToAppend += `
        <div class="col col-md-4 col-lg-3">
        <figure class="card card-producto">
            <div class="image-wrap">
                <img src="` + product.imgSrc + `" alt="` + product.desc + `">
            </div>
                <figcaption class="info-wrap">
                    <a href="product-info.html">
                        <h4 class="title">`+ product.name + /* ` / ` + product.cost + ` ` + product.currency + */ `</h4>
                    </a>
                        <p class="desc">` + product.description + `</p>
                        <div class="vendidos">` + product.soldCount + `vendidos </div>
                </figcaption>
                <div class="bottom-wrap">
                    <span class="price"> ` + product.cost + ` ` + product.currency + ` </span>
                </div>
            </div>
        </figure>
        `
    }
        //despues de un rato al fin le di al clavo, resulta que los `` estan para algo, despues es solo
        //llamar al dato que necesito del json, una vez que encontré como hacerlo funcionar fue como la seda
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    hideSpinner();
}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

var newList = [];

function verification(){
    var written = document.getElementById("searcher").value;
      var newList = productsArray.filter(function(product){
          return product.name.toLowerCase().includes(written.toLowerCase());
      }
      );
      showProductsList(newList);
};

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            newList = resultObj.data;
        }
    });
});

function showList(list){
    let htmlContentToAppend = "";
    for(let i = 0; i < list.length; i++){
        let product = list[i];

        htmlContentToAppend +=`
        <li> ID:`+product.id + ` <strong> ` + list.product + `</strong> Producto:` + product.name +`</li>
        `

        document.getElementById("list").innerHTML = htmlContentToAppend;
    }
}
document.getElementById("searcher").addEventListener("keyup", verification);