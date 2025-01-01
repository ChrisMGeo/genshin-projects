export const giDeviceTypes = [
  "Windows",
  "iOS",
  "PS4",
  "PS5",
  "Android",
  "XboxScarlett",
] as const;
export type GIDeviceType = (typeof giDeviceTypes)[number];
export const giLayoutTypes = [
  "LAYOUT_PC",
  "LAYOUT_PS",
  "LAYOUT_MOBILE",
] as const;
export type GILayoutType = (typeof giLayoutTypes)[number];
export const convertDeviceToLayout = (
  deviceType: GIDeviceType
): GILayoutType => {
  switch (deviceType) {
    case "Windows":
      return "LAYOUT_PC";
    case "Android":
    case "iOS":
      return "LAYOUT_MOBILE";
    case "PS4":
    case "PS5":
    case "XboxScarlett":
      return "LAYOUT_PS";
  }
};
