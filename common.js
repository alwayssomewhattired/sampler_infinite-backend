const { PrismaClient } = require("@prisma/client");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const dotenv = require("dotenv");
const path = require("path");

const envFile = `.env.${process.env.NODE_ENV || "production"}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log("Loaded ENV: ", process.env.NODE_ENV);

const secretName = process.env.SECRET_NAME;
const region = process.env.REGION;
const dev = process.env.DATABASE_ENVIRONMENT;

let prismaInstance = null;

async function loadDatabaseURLFromSecret() {
  const client = new SecretsManagerClient({ region });
  const command = new GetSecretValueCommand({ SecretId: secretName });

  try {
    const response = await client.send(command);
    const secretString = response.SecretString;
    const secret = JSON.parse(secretString);
    const { username, password, host, port, dbname } = secret;

    return `postgres://${username}:${password}@${host}:${port}/${dbname}`;
  } catch (err) {
    console.error("Error retrieving secret: ", err);
    throw err;
  }
}

async function getPrisma() {
  if (prismaInstance) return prismaInstance;

  if (!dev) {
    const dbUrl = await loadDatabaseURLFromSecret();
    process.env.DATABASE_URL = dbUrl;
  }
  prismaInstance = new PrismaClient();
  return prismaInstance;
}

module.exports = { getPrisma, dev };
