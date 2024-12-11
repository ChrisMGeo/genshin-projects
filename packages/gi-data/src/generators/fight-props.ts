import manualTextMap from "../generated/excel-bin-output/manual-text-map-config-data.js";

export const getFightPropInfos = () => {
  let res: { [key: string]: number } = {};
  for (const { textMapId, textMapContentTextMapHash } of manualTextMap.filter(
    (e) => e.textMapId.startsWith("FIGHT_PROP_")
  )) {
    res[textMapId] = textMapContentTextMapHash;
  }
  return res;
};
