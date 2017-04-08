const expressSessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}

export default expressSessionOptions
