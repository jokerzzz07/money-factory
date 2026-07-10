export interface TradeSignal {
  id: string;
  pair: string;
  type: "BUY" | "SELL";
  entry: string;
  tp1: string;
  tp2: string;
  tp3: string;
  sl: string;
  time: string;
  status: string;
  confidence: string;
  rationale: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  duration: string;
  difficulty: string;
  progress: number;
  modules: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}
