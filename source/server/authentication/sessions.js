const expressSessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}

export default expressSessionOptions
