const https = require('https');

//FIXME: parameter for MHS address
https.get('https://mhs-outbound.local.internal-mhs.nhs.net', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
  process.exit(5);
});
