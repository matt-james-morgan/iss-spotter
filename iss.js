const request = require("request");

const fetchMyIP = (callback) =>{
  request("https://api.ipify.org?format=json", (error, response, body)=>{
  
    if (error) {
      callback(error,null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);

    callback(error, data.ip);

  });
};




const fetchCoordsByIP = (ip, callback) =>{
  request(`http://ipwho.is/${ip}`, (error, response, body)=>{

  
    const data = JSON.parse(body);
    
    const {latitude, longitude} = data;
   

    if (data.sucess === false) {
      const msg = data.message;
      callback(Error(msg), null);
      return;
    }

    if (error) {
      const msg = "Error from server: " + error;
      callback(Error(msg), null);
    }
  
    callback(null, {latitude, longitude});

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  
  if (!coords.latitude || !coords.longitude) {
    callback(Error("invalid lat or long"), null);
    return;
  }

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body)=>{

    const parsedData = JSON.parse(body);
    
  
    if (error) {
      const msg = "Error from server: " + error;
      callback(Error(msg), null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(error, parsedData.response);

  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip)=>{
    if(error){
      console.log(error);
      return;
    }
    fetchCoordsByIP(ip,(error, coords)=>{
      if(error){
        console.log(error);
        return;
      }
      fetchISSFlyOverTimes(coords,(error, passTimes)=>{
        callback(error, passTimes);
      });
    });
  });
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};