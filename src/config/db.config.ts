export default () => ({
  database: process.env.DATABASE_URL,
  port: process.env.PORT || 5000,
  jwt: process.env.JWT_SECRET,
});

/*

export default () => ({
  database: process.env.DATABASE_URL,
  port: process.env.PORT || 5000,
  jwt: {
  secret:process.env.JWT_SECRET,
  }
});
*/
