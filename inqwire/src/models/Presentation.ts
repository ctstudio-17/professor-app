import { Slide } from './';

export interface Presentation {
  id: string;
  name: string;
  webViewLink: string;

  currentPage: number;
  slides: Slide[];
}
