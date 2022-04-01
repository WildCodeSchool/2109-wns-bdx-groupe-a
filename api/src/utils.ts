import { randomBytes } from "crypto";

// eslint-disable-next-line import/prefer-default-export
export const getRandomHexID = () : string => randomBytes(16).toString("hex");