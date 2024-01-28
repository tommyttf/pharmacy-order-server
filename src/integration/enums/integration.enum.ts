export enum EPharmacyName {
  healthmart = 'healthMart',
  careplus = 'carePlus',
  quickcare = 'quickCare',
}

export type EPharmacyNameValues = `${EPharmacyName}`;
export type EPharmacyNameKeys = keyof typeof EPharmacyName;
