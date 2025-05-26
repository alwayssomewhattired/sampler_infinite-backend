const { PrismaClient } = require("@prisma/client");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const secretName = "samplerinfinitePostgres";
const region = "us-east-2";
const dev = false;

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
