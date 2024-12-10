import {
  existsSync,
  mkdirSync,
  PathLike,
  WriteFileOptions,
  writeFileSync,
} from "fs";

export const writeFileSyncRecursive = (
  file: PathLike,
  data: string | NodeJS.ArrayBufferView,
  options?: WriteFileOptions
) => {
  let filepath = file.toString().replace(/\\/g, "/");

  let root = "";
  if (filepath[0] === "/") {
    root = "/";
    filepath = filepath.slice(1);
  } else if (filepath[1] === ":") {
    root = filepath.slice(0, 3);
    filepath = filepath.slice(3);
  }

  const folders = filepath.split("/").slice(0, -1);
  folders.reduce((acc, folder) => {
    const folderPath = acc + folder + "/";
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }
    return folderPath;
  }, root);

  writeFileSync(root + filepath, data, options);
};
