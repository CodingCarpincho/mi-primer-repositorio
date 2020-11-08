/**
 * convertImgToBase64
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat='image/png']
 * @example
	convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){
		console.log('IMAGE:',base64Img);
	})
 */
function convertImgToBase64(url, callback, outputFormat){
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		canvas.height = img.height;
		canvas.width = img.width;
	  	ctx.drawImage(img,0,0);
	  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	  	callback.call(this, dataURL);
        // Clean up
	  	canvas = null; 
	};
	img.src = url;
}


$('#img2b64').submit(function(event){
    var imageUrl = $(this).find('input[name=url]').val();
    console.log('imageUrl', imageUrl);
    convertImgToBase64(imageUrl, function(base64Img){
        $('.output')
            .find('textarea')
                .val(base64Img)
                .end()
            .find('a')
                .attr('href', base64Img)
                .text(base64Img)
                .end()
            .find('img')
                .attr('src', base64Img);
                try {
                    localStorage.setItem('imageBase64', base64Img); //guardo la imagen en base64 en el localStorage
                    localStorage.setItem('imageUrl', JSON.stringify(imageUrl)); //guardo el link que el user da a la imagen en locastorage y lo ¿stringifeo? para parsearlo al cargar la págica
                }
                catch (e) {
                    console.log("Storage failed: " + e);
    }});

    event.preventDefault();
});

document.addEventListener("DOMContentLoaded", function (e) {
    var avatar = JSON.parse(localStorage.getItem('imageUrl'));
    document.getElementById('imgurl').value = avatar
    document.getElementById('btn64').click();
    //no sé si realmente esto vale pero lo até con alambre
    //para ahorrarme problemas 
});