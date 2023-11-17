const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((err, ip)=>{
//   if(err){
//     console.log('It didn\'t work! ', err)
//     return;
//   }
//   console.log("It worked!" , ip);
// })

// fetchCoordsByIP("142.198.59.139",(err,coords)=>{
//   if(err){
//     console.log(err.message);
//     return;
//   }
//   console.log(coords);
// })

// fetchISSFlyOverTimes({latitude:"43.653226", longitude:"-79.383184"}, (err, data)=>{
//   if(err){
//     console.log(err.message);
//     return;
//   }
//   console.log(data);
// })

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes)=>{
  if(error){
    return console.log("It did not work: ", error);
  }
  printPassTimes(passTimes);
 
  });
  
