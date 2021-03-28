const { Client } = require('cassandra-driver');

async function run() {
      console.log("DB Security Path:" ,process.env.DB_SECURITY_PATH)
      const client = new Client({
              cloud: { secureConnectBundle: process.env.DB_SECURITY_PATH },
              credentials: { username: process.env.CLIENT_ID, password: process.env.CLIENT_SECRET }
            });

      await client.connect();

      // Execute a query
      const rs = await client.execute('SELECT * FROM system.local');
      console.log(`Hello from cluster: ${rs.first()['cluster_name']}`);
    
      await client.shutdown();
}

// Run the async function
run();
