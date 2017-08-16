module.exports = {
  google: {
    client_id: process.env.MREN_EMAILY_GOOGLE_CLIENT_ID,
    project_id: "mern-emaily-dev",
    client_secret: process.env.MERN_EMAILY_GOOGLE_CLIENT_SECRET
  },
  cookieKey: process.env.MERN_EMAILY_COOKIE_KEY,
  mongoDBURL: process.env.MERN_EMAILY_MONGO_URL,
  stripe: {
    pub_key: process.env.MERN_EMAILY_STRIPE_PUB_KEY,
    secret_key: process.env.MERN_EMAILY_STRIPE_SECRETE_KEY
  }
}