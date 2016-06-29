(function() {
  window.imageUpload = function (cloudinary, callback) {
      $(".file-upload")[0].addEventListener('change', function (event) {
          Materialize.toast('Bild lädt hoch...', 2000);
          cloudinary.upload(event.target.files[0], { /* cloudinary options here */ })

          // This returns a promise that can be used for result handling

          .then(function (response) {
            callback(response.data.public_id + '.' + response.data.format)
            Materialize.toast('Bild hochgeladen.', 1000, 'green');
          })
          .catch(function (error) {
            console.log(error);
            Materialize.toast(error.data.message);
          });
      } , false);
    }
}).call(this);
