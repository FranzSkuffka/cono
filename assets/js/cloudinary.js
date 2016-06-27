app.config(function (cloudinaryProvider) {
  cloudinaryProvider.config({
    upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
    cloud_name: 'dtryikwk5', // required
    upload_preset: 'av3p0rjy' // optional
  });
})
