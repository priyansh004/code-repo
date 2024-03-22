import redis from 'redis';
const client = redis.createClient();

import {getAllrecords} from './outputclt.js';

export async function redisgetAllRecords () {
  try {
      // Check if data is cached in Redis
      client.get('allRecords', async (err, cachedData) => {
          if (err) throw err;

          if (cachedData) {
              // Data exists in Redis cache, return it
              return JSON.parse(cachedData);
          } else {
              // Data not found in Redis cache, fetch from MySQL database
              const records = await getAllrecords();

              // Store fetched data in Redis cache with expiration time (e.g., 1 hour)
              client.setex('allRecords', 3600, JSON.stringify(records));

              // Return fetched records
              return records;
          }
      });
  } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
  }
}