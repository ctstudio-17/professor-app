import * as firebase from 'firebase';

import { Poll, Presentation, Slide } from './models';

class FirebaseApi {
  fire: any;
  classId?: number;
  lectureId?: string;

  classPath = () => `classes/${this.classId}`;
  lecturePath = () => `${this.classPath()}/lectures/${this.lectureId}`;

  constructor(fireObj: any) {
    this.fire = fireObj;
  }

  getCurrentTime = () => parseInt(String(new Date().getTime() / 1000), 10);

  getAllClasses = () =>
    this.fire.database().ref(`classes`)
  setClass = (id?: number) => this.classId = id;

  getAllLectures = () =>
    this.fire.database().ref(`${this.classPath()}/lectures`)
  getLecture = (id: string) =>
    this.fire.database().ref(`${this.classPath()}/lectures/${id}`)
  setLecture = (id?: string) => this.lectureId = id;

  getLastLecture = () =>
    this.fire.database().ref(`${this.classPath()}/lectures`).limitToLast(1)
  isLectureRunning = (id: string) =>
    this.fire.database().ref(`${this.classPath()}/lectures/${id}/in_progress`)
  startLecture = () => {
    const ref = this.fire.database().ref(`${this.classPath()}/lectures`).push({
      in_progress: true,
      start_time: this.getCurrentTime()
    });
    this.setLecture(ref.key);
  }
  endLecture = () => {
    this.fire.database().ref(`${this.lecturePath()}`).update({
      in_progress: false,
      end_time: this.getCurrentTime()
    });
  }

  getPresentation = () =>
    this.fire.database().ref(`${this.lecturePath()}/presentation`).once('value')
  getPresentationSlides = () =>
    this.fire.database().ref(`${this.lecturePath()}/presentation/slides`).once('value')

  setPresentation = (presentation: Presentation) =>
    this.fire.database().ref(`${this.lecturePath()}`).update({ presentation })
  closePresentation = () =>
    this.fire.database().ref(`${this.lecturePath()}/presentation`).remove()
  setSlides = (slides: Slide[]) =>
    this.fire.database().ref(`${this.lecturePath()}/presentation`).update({ slides })
  setCurrentSlide = (page: number) =>
    this.fire.database().ref(`${this.lecturePath()}/presentation`).update({ currentPage: page })
  setSlideThumbnail = (page: number, url: string) => {
    if (this.classId !== undefined && this.lectureId !== undefined) {
      this.fire.database().ref(`${this.lecturePath()}/presentation/slides/${page}`).update({ thumbnailUrl: url });
    }
  }

  createPoll = (poll: Poll) =>
    this.fire.database().ref(`${this.lecturePath()}/polls`).push(poll)
  closePoll = (pollKey: string) =>
    this.fire.database().ref(`${this.lecturePath()}/polls/${pollKey}`).update({ isActive: false })

  getConfusionRef = () =>
    this.fire.database().ref(`${this.lecturePath()}/confusions`)
  getFeedbackRef = () =>
    this.fire.database().ref(`${this.lecturePath()}/feedback`)
  getPollResponseRef = (key: string) =>
    this.fire.database().ref(`${this.lecturePath()}/polls/${key}/responses`)
  getPollsRef = () =>
    this.fire.database().ref(`${this.lecturePath()}/polls`)
}

function initApi() {
  const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: 'AIzaSyAw-jv35IFQVWYniOGvADPgzhkzz7NDXUQ',
    authDomain: 'inqwire-8b669.firebaseapp.com',
    databaseURL: 'https://inqwire-8b669.firebaseio.com',
    projectId: 'inqwire-8b669',
    storageBucket: 'inqwire-8b669.appspot.com',
    messagingSenderId: '1084283745977',
  };

  return firebase.initializeApp(config);
}

const fire = initApi();
const api: FirebaseApi = new FirebaseApi(fire);

export default api;
