const redis = require('redis');

let client;
let redisEnabled = false;

async function connectRedis() {
  // Skip Redis if not configured or already tried and failed
  if (!process.env.REDIS_URL) {
    if (redisEnabled === null) {
      console.log('ℹ️  Redis not configured (optional) - caching disabled');
      redisEnabled = false;
    }
    return null;
  }

  if (client) return client;
  if (redisEnabled === false) return null; // Already failed, don't retry

  try {
    client = redis.createClient({
      url: process.env.REDIS_URL
    });

    // Suppress error logs - Redis is optional
    client.on('error', () => {
      if (redisEnabled !== false) {
        console.log('⚠️  Redis unavailable (optional) - continuing without cache');
        redisEnabled = false;
      }
    });
    
    client.on('connect', () => {
      console.log('✅ Redis connected');
      redisEnabled = true;
    });

    await client.connect();
    return client;
  } catch (error) {
    if (redisEnabled !== false) {
      console.log('⚠️  Redis unavailable (optional) - continuing without cache');
      redisEnabled = false;
    }
    return null;
  }
}

async function getCache(key) {
  const client = await connectRedis();
  if (!client) return null;
  try {
    return await client.get(key);
  } catch (error) {
    console.warn('Cache get failed:', error.message);
    return null;
  }
}

async function setCache(key, value, ttl = 300) {
  const client = await connectRedis();
  if (!client) return null;
  try {
    return await client.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.warn('Cache set failed:', error.message);
    return null;
  }
}

async function delCache(key) {
  const client = await connectRedis();
  if (!client) return null;
  try {
    return await client.del(key);
  } catch (error) {
    console.warn('Cache delete failed:', error.message);
    return null;
  }
}

module.exports = {
  connectRedis,
  getCache,
  setCache,
  delCache
};
