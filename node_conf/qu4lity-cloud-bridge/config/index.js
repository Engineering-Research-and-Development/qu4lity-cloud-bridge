module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' 
    ? process.env.PORT 
    :  9000,
  mpfq_mariadb_host: process.env.NODE_ENV === 'production' 
    ? process.env.MPFQ_MARIADB_HOST
    : "localhost",
  mpfq_mariadb_port: process.env.NODE_ENV === 'production' 
    ? process.env.MPFQ_MARIADB_PORT
    : "3306",
  mpfq_mariadb_db: process.env.NODE_ENV === 'production' 
    ? process.env.MPFQ_MARIADB_DB
    : "whr_mpfq_relational",
  mpfq_mariadb_user: process.env.NODE_ENV === 'production' 
    ? process.env.MPFQ_MARIADB_USER
    : "root",
  mpfq_mariadb_password: process.env.NODE_ENV === 'production' 
    ? process.env.MPFQ_MARIADB_PASSWORD
    : "r00t"
};