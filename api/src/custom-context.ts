import User from "./models/User";

export type CustomContext = {
  onSessionCreated: (sessionId: string) => void;
  user: User | null;
  sessionId: string;
};