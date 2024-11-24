import { existsSync, readFileSync } from "fs";
import { GIDATA_ROOT } from "./paths.js";

export function readDMJSON(path: string) {
  const fullPath = `${GIDATA_ROOT}/${path}`;
  if (!existsSync(fullPath)) throw `File not found :${fullPath}`;
  return readFileSync(fullPath).toString();
}
