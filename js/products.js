var productsArray = [];
showSpinner();
function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + ` / ` + product.cost + ` ` + product.currency + `</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                 <small class="text-muted">` + product.description + `</small>
                </div>
            </div>
        </div>
        `
        //despues de un rato al fin le di al clavo, resulta que los `` estan para algo, despues es solo
        //llamar al dato que necesito del json, una vez que encontré como hacerlo funcionar fue como la seda
        document.getElementById("cat-list-contain").innerHTML = htmlContentToAppend;
    
    }
    hideSpinner();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});