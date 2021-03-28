const { Client } = require('cassandra-driver');
const bcrypt = require('bcrypt')

var saltRounds = 10;

console.log("DB Security Path:" ,process.env.DB_SECURITY_PATH)
let client = new Client({
            cloud: { secureConnectBundle: process.env.DB_SECURITY_PATH },
            credentials: { username: process.env.CLIENT_ID, password: process.env.CLIENT_SECRET },
            keyspace: 'data'
      });
/*client.on('log', (level, loggerName, message, furtherInfo) => {
      console.log(`${level} - ${loggerName}:  ${message}`);
});*/

async function connect(){
      await client.connect();

      // Execute a query
      const rs = await client.execute('SELECT * FROM system.local');
      console.log(`Hello from cluster: ${rs.first()['cluster_name']}`);
}

async function close(){
      await client.shutdown();
}

async function createUser(username, name, password){
      return new Promise (data => 
            bcrypt.hash(password, saltRounds, (err, hash) => {
                  client.execute("INSERT INTO users (email, name, password) VALUES (?, ?, ?) IF NOT EXISTS", [username, name, hash], (err) => {
                        console.log(err);
                        if(err){
                              console.log("Error creating user.")
                        }
                        data(err);
                  })
            })
      )
}

async function signIn(username, password, request){
      return new Promise (data =>
          client.execute("SELECT * FROM users WHERE email = ?", [username]).then( (result) => {
              if (result.rowLength > 0){
                  // Check password
                  bcrypt.compare(password, result.rows[0].password, (err, check) => {
                      if(check){
                          // Establish session.
                          request.session.loggedin = true;
                          request.session.username = username;
                          data({
                              "success": true,
                              "profile": {
                                  "username": result.rows[0].email,
                                  "display_name": result.rows[0].name,
                              }
                          })
                      }
                      else{
                          // Return invalid user/pass.
                          console.log("Bad pass.");
                          data( {"error": "Invalid username/password."} )
                      }
  
                  })
              }
              else{
                  // Username does not exist, return invalid user/pass.
                  console.log("Bad user.")
                  data( {"error": "Invalid username/password."} )
              }
          })
      )
  }

async function addData(mac, time, lat, long){
      return new Promise (data => 
            bcrypt.hash(password, saltRounds, (err, hash) => {
                  client.execute("INSERT INTO users (email, name, password) VALUES (?, ?, ?) IF NOT EXISTS", [username, name, hash], (err) => {
                        console.log(err);
                        if(err){
                              console.log("Error creating user.")
                        }
                        data(err);
                  })
            })
      )
}

module.exports = {
      connect,
      close,
      createUser,
      signIn,
      addData
}