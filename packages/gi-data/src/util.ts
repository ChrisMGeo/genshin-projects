import { existsSync, readFileSync } from "fs";
import { GI_DM_ROOT } from "./paths.js";

export function readDMJSON(path: string) {
  const fullPath = `${GI_DM_ROOT}/${path}`;
  if (!existsSync(fullPath)) throw `File not found :${fullPath}`;
  return readFileSync(fullPath).toString();
}
