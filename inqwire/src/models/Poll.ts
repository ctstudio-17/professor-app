export interface Poll {
  answers: string[];
  correctAns: boolean[];
  pollTime: number;
  questionText: string;
  isActive: boolean;
  responses: number[];
}
