export type ChatMessage = {
    id: string;
    role: "user" | "bot";
    content: string;
    ts: number;
  };
  
  export type PromptItem = {
    name: string;
    subject: string;
    meta: string;
    prompt: string;
    active?: boolean;
  };