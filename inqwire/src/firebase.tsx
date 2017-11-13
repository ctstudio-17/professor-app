import * as firebase from 'firebase';

import { Poll, Presentation, Slide } from './models';

class FirebaseApi {
  fire: any;
  classId: number;
  lectureId: number;

  constructor(fireObj: any) {
    this.fire = fireObj;
    this.setClass(1);
    this.setLecture(1);
  }

  setClass = (id: number) => this.classId = id;
  setLecture = (id: number) => this.lectureId = id;

  startLecture = () =>
    this.fire.database().ref(`lectures/${this.lectureId}`).update({'in_progress': true})
  endLecture = () =>
    this.fire.database().ref(`lectures/${this.lectureId}`).update({'in_progress': false})

  getPresentation = () =>
    this.fire.database().ref(`lectures/${this.lectureId}/presentation`).once('value')

  setPresentation = (presentation: Presentation) =>
    this.fire.database().ref(`lectures/${this.lectureId}`).update({ presentation })
  closePresentation = () =>
    this.fire.database().ref(`lectures/${this.lectureId}/presentation`).remove()
  setSlides = (id: string, slides: Slide[]) =>
    this.fire.database().ref(`lectures/${this.lectureId}/presentation`).update({ slides })
  setCurrentSlide = (page: number) =>
    this.fire.database().ref(`lectures/${this.lectureId}/presentation`).update({ currentPage: page })
  setSlideThumbnail = (page: number, url: string) =>
    this.fire.database().ref(`lectures/${this.lectureId}/presentation/slides/${page}`).update({thumbnailUrl: url})

  createPoll = (poll: Poll) =>
    this.fire.database().ref(`lectures/${this.lectureId}/polls`).push(poll)

  getConfusionRef = () =>
    this.fire.database().ref(`lectures/${this.lectureId}/confusions`)
  getFeedbackRef = () =>
    this.fire.database().ref(`lectures/${this.lectureId}/feedback`)
  getPollResponseRef = (key: string) =>
    this.fire.database().ref(`lectures/${this.lectureId}/polls/${key}/responses`)
  getStudentRef = () =>
    this.fire.database().ref(`classes/${this.classId}/students`)
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
