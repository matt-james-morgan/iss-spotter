const request = require("request");

const fetchMyIP = (callback) =>{
  request("https://api.ipify.org?format=json", (error, response, body)=>{
  
  const data = JSON.parse(body);

  callback(error, data.ip);

  })
}

module.exports = {fetchMyIP};