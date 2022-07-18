const crypto = require("crypto");


const generateHashFromSeed = (seeder) => {
  const seederKey = typeof seeder !== 'string'
      ? JSON.stringify(seeder)
      : seeder;

  return crypto
      .createHash("sha3-512")
      .update(seederKey)
      .digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // Early exit to avoid unnecessary computation
  if (!event) return TRIVIAL_PARTITION_KEY;

  // if partitionKey is undefined entirely, use event as seeder and generate a hash as candidate
  let key = event.partitionKey || generateHashFromSeed(event);

  if (typeof key !== "string") {
    key = JSON.stringify(key);
  }

  if (key.length > MAX_PARTITION_KEY_LENGTH) {
    return generateHashFromSeed(key);
  }

  return key;
};