// next.config.js
require("dotenv");

module.exports = {
  env: {
    NEXT_PUBLIC_SERVER_API: process.env.SERVER_API,
    NEXT_PUBLIC_CLIENT_URL: process.env.CLIENT_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    NEXT_PUBLIC_STRIPE_FRONTEND: process.env.STRIPE_FRONTEND,
  },
};
