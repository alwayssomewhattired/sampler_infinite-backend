const { PrismaClient } = require("@prisma/client");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const secretName = "samplerinfinitePostgres";
const region = "us-east-2";

let prisma;

async function loadDatabaseURLFromSecret() {
  const client = new SecretsManagerClient({ region });
  const command = new GetSecretValueCommand({ SecretId: secretName });

  try {
    const response = await client.send(command);
    const secretString = response.SecretString;
    const secret = JSON.parse(secretString);
    const { username, password, host, port, dbname } = secret;

    // Build the DATABASE_URL
    return `postgres://${username}:${password}@${host}:${port}/${dbname}`;
  } catch (err) {
    console.error("Error retrieving secret: ", err);
    throw err;
  }
}

// This function returns a ready to use Prisma client
async function getPrismaClient() {
  if (!prisma) {
    const dbUrl = await loadDatabaseURLFromSecret();
    process.env.DATABASE_URL = dbUrl;
    prisma = new PrismaClient();
  }
  return prisma;
}

module.exports = { getPrismaClient };

