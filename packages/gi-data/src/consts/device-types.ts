export const giDeviceTypes = ["PC", "PS", "MOBILE"] as const; // TODO: Add XBox
export type GIDeviceType = (typeof giDeviceTypes)[number];
