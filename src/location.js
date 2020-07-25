const https = require("https");

let locat;
let location = [];

https
  .get(
    "https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=list&key=0",
    (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        console.log(JSON.parse(data));
        locat = JSON.parse(data).map((obj) => {
          return obj.vertex_name;
        });

        console.log(locat);
      });
    }
  )
  .on("error", (err) => {});

// https
//   .get(
//     "https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes?start=1&end=5",
//     (resp) => {
//       let data = "";
//       resp.on("data", (chunk) => {
//         data += chunk;
//       });
//       resp.on("end", () => {
//         let directions;
//         console.log(JSON.parse(data));
//         directions = JSON.parse(data).map((obj) => {
//           return obj.edge_description;
//         });

//         console.log(directions);
//       });
//     }
//   )
//   .on("error", (err) => {});

// export default location;
