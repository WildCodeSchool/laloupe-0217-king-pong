import Community from './server/api/models/community.js';
import db from "./server/api/db.js";
import mongoose from "mongoose";

var body = [{
    "name": "WCS Paris",
    "location": "Paris",
    "users": []
  },
  {
    "name": "WCS Lyon",
    "location": "Lyon",
    "users": []
  },
  {
    "name": "WCS La loupe",
    "location": " La loupe",
    "users": []
  },
  {
    "name": "WCS Bordeaux",
    "location": "Bordeaux",
    "users": []
  },
  {
    "name": "WCS Lille",
    "location": "Lille",
    "users": []
  },
  {
    "name": "WCS Fontainebleau",
    "location": "Fontainebleau",
    "users": []
  },
  {
    "name": "WCS Orleans",
    "location": " Orleans",
    "users": []
  }
];

let community = new Community();

function scriptToExecuteWithDatabase() {
  let communityCreated = 0;
  body.forEach(function(infos) {
    community.createDb(infos, function(res) {
      console.log(res);
      console.log('community:', infos.name, 'created success', res.success);
      communityCreated++;
      if (communityCreated >= 4) {
        mongoose.connection.close();
      }
    });
  });
}

db(scriptToExecuteWithDatabase);
