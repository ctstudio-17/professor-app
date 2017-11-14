import { Confusion, Feedback, Poll, Presentation } from './';

export interface Lecture {
  id: string;
  inProgress: boolean;
  startTime: Date;
  endTime?: Date;

  confusions?: Confusion[];
  feedback?: Feedback[];
  polls?: Poll[];
  presentation?: Presentation;
}
