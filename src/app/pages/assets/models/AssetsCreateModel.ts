export interface AssetsCreateModel {
  id?: number;
  name: string;
  acquisitionValue: number | null | undefined;
  estimatedValue: number | null | undefined;
  lowValue: number | null | undefined;
  highValue: number | null | undefined;
  photo?: string | File;
  syntasisSummary?: string;
  fullConversationHistory?: string;
  category?: number;
  attributes: {},
  prefilledFromDraft?: boolean
  assetDate?: string
  categoryDetails: {
    attributes: any,
    categoryName: string,
    id: number
  }
}

