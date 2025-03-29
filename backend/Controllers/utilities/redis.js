const redis = require('redis');

const client = redis.createClient({ host: '127.0.0.1', port: 6379 });

// const client = redis.createClient({
//     socket: {
//       host: '127.0.0.1',
//       port: 6379,
//     }
//   });

async function initializeRedis() {
  try {
    await client.connect();
    console.log('Redis connected successfully');
    await client.set("user123", JSON.stringify({ name: "satish", role: "admin" }));
    
  } catch (err) {
    console.error('Redis error: ' + err);
  }
}

initializeRedis();

client.on('error', (err) => {
  console.log('Redis error: ' + err);
});

module.exports = client;

