var productinfo = {}; 

var productsLists ={}; 
 
function showImGallery(array){ 

    let htmlContentToAppend = ""; 

    for(let i = 0; i < array.length; i++){ 
        let fuenteImagen = array[i]; 

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6"> 
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + fuenteImagen + `" alt="">
            </div>
        </div> `
        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") 
        {
            productinfo = resultObj.data;
          
           let productNameHTML  = document.getElementById("productName");

          let productPriceHTML = document.getElementById("productPrice");
          let productMonedaHTML = document.getElementById("productMoneda");


            let proDescripHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");
          
            let prodCategHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = productinfo.name;       
            productPriceHTML.innerHTML = productinfo.cost;      
            productMonedaHTML.innerHTML = productinfo.currency;
            proDescripHTML.innerHTML = productinfo.description; 
            soldCountHTML.innerHTML = productinfo.soldCount;
            prodCategHTML.innerHTML = productinfo.category;
            
            showImGallery(productinfo.images);
          }
      getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(result){
        if (result.status === "ok"){
          comms = result.data;
          var comments = "";
            for(i = 0; i < comms.length; i++){
            var points = "";
            for(y = 0; y <= 5; y++) {
              if (y <= comms[i].score) {
                points += `<span class = "fas fa-star checked > </span>`;
              } else {
                points += `<span class = "fas fa-star> </span>`;
              }
            }
            comments += `
            <div> 
            <hr>
            <p><b> ` + comms[i].user + `</b>
            Puntaje: ` + points + `</p>
            <small><p>` + comms[i].description + ` </p></small>
            </div>`
          }
          document.getElementById("comment").innerHTML = comments;
        } else {
          document.getElementById("comment").innerHMTL = "No se pueden cargar los comentarios"
        }
      });
    });
  });