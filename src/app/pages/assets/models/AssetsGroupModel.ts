export interface Asset {
  id: number;
  name: string;
  acquisitionValue: string;
  estimatedValue: string;
  lowValue: string | null;
  highValue: string | null;
  photo: string | null;
  syntasisSummary: string | null;
  fullConversationHistory: string | null;
  attributes: CarAttributes | null;
}

export interface CarAttributes {
  vin: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  style: string;
  madeIn: string;
  fuelCapacity: string;
  cityMileage: string;
  highwayMileage: string;
  engine: string;
  transmission: string;
  transmissionShort: string;
  drivetrain: string;
  antiBrakeSystem: string;
  steeringType: string;
  overallLength: string;
  wheelbaseLength: string;
  standardSeating: string;
  invoicePrice: string;
  deliveryCharges: string;
  msrp: string;
  productionSequenceNumber: string;
  frontBrakeType: string;
  rearBrakeType: string;
  frontSuspension: string;
  rearSuspension: string;
  frontSpringType: string;
  rearSpringType: string;
  tires: string;
}

export interface CategoryAssets {
  category: string;
  assets: Asset[];
}

export type CategoryAssetsList = CategoryAssets[];
