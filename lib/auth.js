import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins"


const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db(process.env.DB_NAME);
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  session: {
    cookieCache: {
      enabled: false,
    },
  },
  plugins: [
        admin()
  ],
  user: {
    additionalFields: {
      userRole: {
        default: 'donor'
      },
      status: {
        default: 'active'
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
      },
      lastDonated: {
        default: null
      }
    }
  }
});