export default () => {
  return {
    nodeEnv: process.env.NODE_ENV || 'local',

    port: parseInt(process.env.PORT, 10),
    expiresIn: parseInt(process.env.EXPIRES_IN, 10),
    jwtSecret: process.env.JWT_SECRET,

    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT, 5432),
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,

    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME
  };
};
