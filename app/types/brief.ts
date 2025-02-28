export interface Brief {
  id: number;
  name: string;
  topics?: string[];
  length?: string;
  frequency?: string;
  tone?: string;
  sources?: string[];
  restricted_sources?: string[];
  target_audience?: string;
  created_at?: string;
  updated_at?: string;
}
