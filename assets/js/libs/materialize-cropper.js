(function() {
  window.materializeCropper = function (callback) {
    function handleFileSelect(evt) {
      var f = evt.target.files[0];
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          var filePayload = e.target.result;

          // Generate a location that can't be guessed using the file's contents and a random number

          $('#CropModal').openModal();

          cropper.croppie('bind', {
            url: filePayload,
          });

          $('#SaveImage').on('click', function () {
            $('#CropModal').closeModal();
            cropper.croppie('result', {
              type: 'canvas',
              size: {width: 200, height: 200},
              quality: .8
            }).then(callback)
          })
        };
      })(f);
      reader.readAsDataURL(f);
    }


    var cropper = $('#croppie').croppie({
      viewport: {
        width: 115,
        height: 115
      }
    });


    $(".file-upload")[0].addEventListener('change', handleFileSelect, false);


  }
}).call(this);
