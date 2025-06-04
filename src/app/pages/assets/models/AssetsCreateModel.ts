export interface AssetsCreateModel {
  id?: number;
  name: string;
  value: number | null | undefined;
  valueOverTime: number | null | undefined;
  photo?: string | File;
  syntasisSummary?: string;
  fullConversationHistory?: string;
}
