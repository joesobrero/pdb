export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          email: string;
          created_at: string;
          full_name: string | null;
          openai_api_key: string | null;
        };
        Insert: {
          id?: number;
          email: string;
          created_at?: string;
          full_name?: string | null;
          openai_api_key?: string | null;
        };
        Update: {
          id?: number;
          email?: string;
          created_at?: string;
          full_name?: string | null;
          openai_api_key?: string | null;
        };
      };
    };
  };
};
