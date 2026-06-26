import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db(process.env.DB_NAME);
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  user: {
    additionalFields: {
      role: {
        default: 'donor'
      },
      status: {
        default: 'Active'
      },
      avatar: {
        default: null
      },
      district: {
        default: null
      },
      upazila: {
        default: null
      },
      bloodGroup: {
        default: null
      }
    }
  }
});