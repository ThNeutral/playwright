import * as crypto from "crypto";

export async function getRandomNumber(ceil: number) {
  return Math.floor(Math.random() * ceil + 1);
}

export async function getRandomString(len: number) {
  return crypto.randomBytes(len).toString("hex");
}
