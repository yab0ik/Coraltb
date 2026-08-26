export interface ChatMessage {
  readonly id: number;
  readonly role: "user" | "assistant";
  readonly content: string;
}

export interface ChatSession {
  readonly id: string;
  readonly title: string;
  readonly messages: ChatMessage[];
  readonly files: File[];
  readonly isProjectStarted: boolean;
  readonly updatedAt: number;
}
