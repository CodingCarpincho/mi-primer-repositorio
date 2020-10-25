var carritoArray = [];

function showCarritoList(array) {
    let htmlContentToAppend = "";
        for(let i = 0; i < array.length; i++) {
            let articulo = array[i];

            htmlContentToAppend += `
                             <tr>
                               <td><img src="` + articulo.src + `" height="50"/></td>
                               <td>` + articulo.name + `</td>
                               <td>` + articulo.unitCost + ' ' + articulo.currency + `</td>
                               <td><input id="prodCount` + i + `" type="number" onchange="subArticleCost()" min="0" value=`+ articulo.count +`></input></td>
                               <td class="text-right"><span class="subCostArticulo"></span> ` + ' ' + articulo.currency + ` </td>
                             </tr>`

                               document.getElementById("carritoContainer").innerHTML = htmlContentToAppend;
                               subArticleCost();
                               articleTotalCost();
            }      
}


function subArticleCost() {
    var costPerArticle = 0;
    var numberOfArticles = 0;

    for (let i= 0; i < carritoArray.length; i++){
        costPerArticle = parseInt(carritoArray[i].unitCost);
        numberOfArticles = document.getElementById("prodCount" + i).value
    }
    subCost = costPerArticle * numberOfArticles;
    //esta parte de la funcion toma el costo del articulo y lo multiplica por la cantidad de articulos que el usuario quiere comprar

document.querySelector(".subCostArticulo").innerHTML = subCost;
document.querySelector("#subCostArticulo2").innerHTML = subCost;

var ship = document.getElementById("envio");
var shipValue = ship.elements["shipOption"].value;
//tomo la opción de envio seleccionada por el usuario y su valor
shipPrice = shipValue * subCost;
shipPrice2 = Math.trunc(shipPrice); //Math.trunc(numero) sirve para eliminar todos los decimales de un integer
document.querySelector("#showShip").innerHTML = shipPrice2;
articleTotalCost();
}

function articleTotalCost(){
    totalCost = shipPrice2 + subCost;
    document.querySelector("#totalCost").innerHTML = totalCost
}
function paymethodtext(){
    methodtext = document 
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if(resultObj.status === "ok") {
            carritoArray = resultObj.data.articles;

            showCarritoList(carritoArray);
        }
    });
});