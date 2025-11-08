import dotenv from "dotenv";
if (process.env.VERCEL !== '1') {
  dotenv.config();
}
import path from "path";
import { google } from "googleapis";
import { writeFileSyncRecursive } from "@repo/utils/fs";

type i18nLocale = {
  [key: string]: i18nLocale | string;
};

const setNestedValue = (
  obj: i18nLocale,
  path: string,
  value: string
): boolean => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in current)) {
      current[key] = {};
      current = current[key];
    } else {
      if (typeof current[key] !== "string") current = current[key]!;
      else {
        return false;
      }
    }
  }
  current[keys[keys.length - 1]!] = value;
  return true;
};

const APP_ROOT = path.resolve(".");
const MONOREPO_ROOT = path.resolve(APP_ROOT, "..", "..");

const GENSHIN_VIEWER_ROOT = path.join(MONOREPO_ROOT, "apps", "genshin-viewer");
const GENSHIN_VIEWER_LOCALES = path.join(GENSHIN_VIEWER_ROOT, "messages");

const main = async () => {
  const credentials = {
    type: process.env.GOOGLEAPIS_TYPE,
    project_id: process.env.GOOGLEAPIS_PROJECT_ID,
    private_key_id: process.env.GOOGLEAPIS_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLEAPIS_PRIVATE_KEY,
    client_email: process.env.GOOGLEAPIS_CLIENT_EMAIL,
    client_id: process.env.GOOGLEAPIS_CLIENT_ID,
    auth_uri: process.env.GOOGLEAPIS_AUTH_URI,
    token_uri: process.env.GOOGLEAPIS_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.GOOGLEAPIS_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLEAPIS_CLIENT_X509_CERT_URL,
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });

  const googleSheets = google.sheets("v4");

  const spreadsheetId = "1f_th-WKRhGdeVhvsgCVSKhV6ZpP9oP8nxWEsULG_9-0";

  const {
    data: { sheets },
  } = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
    fields: "sheets.data.rowData.values.formattedValue",
  });
  let locales: { [key: string]: i18nLocale } = {};
  for (let sheetIndex = 0; sheetIndex < (sheets?.length ?? 0); sheetIndex++) {
    const { data: dataArr } = sheets![sheetIndex]!;
    if (!dataArr) continue;
    for (let dataIndex = 0; dataIndex < dataArr.length; dataIndex++) {
      const { rowData } = dataArr[dataIndex]!;
      if (!rowData) continue;
      for (let row = 0; row < rowData.length; row++) {
        const isHeader = row === 0;
        const { values } = rowData[row]!;
        if (!values) continue;
        let key: string | undefined = undefined;
        for (let col = 0; col < values.length; col++) {
          let { formattedValue } = values[col]!;
          formattedValue ??= "";
          if (!formattedValue) continue;
          if (isHeader && col !== 0) {
            locales[formattedValue] = {};
          }
          if (isHeader) continue;
          if (col === 0) {
            key = formattedValue;
            continue;
          } else {
            if (!key) continue;
            const locale = Object.keys(locales)[col - 1];
            if (!locale) continue;
            if (key && setNestedValue(locales[locale]!, key, formattedValue)) {
              console.log(`Set ${key} for ${locale}`);
            } else {
              console.log(`Failed to set ${key} for ${locale}`);
            }
          }
        }
      }
    }
  }
  for (const locale in locales) {
    const outputPath = path.join(GENSHIN_VIEWER_LOCALES, `${locale}.json`);
    try {
      writeFileSyncRecursive(
        outputPath,
        JSON.stringify(locales[locale]!, null, 2)
      );
      console.log(`Write to ${outputPath} was successful!`);
    } catch (err) {
      console.log(`Write to ${outputPath} failed...`);
    }
  }
};

main();
