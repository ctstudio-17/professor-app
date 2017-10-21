declare const gapi: any;

const googleApiInfo = require('../../assets/client_id.json');

export const setupApi = (callback: any) => {
  return gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'AIzaSyA2A1ci0uiAyCOxJDv8sJ_unyhtA26mQ24',
      clientId: googleApiInfo.web.client_id,
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        'https://slides.googleapis.com/$discovery/rest?version=v1'
      ],
      scope: 'https://www.googleapis.com/auth/drive.readonly'
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(callback);

      // Handle the initial sign-in state.
      callback(getUserLoginStatus());
    });
  });
};

export const signIn = () => gapi.auth2.getAuthInstance().signIn();

export const signOut = () => gapi.auth2.getAuthInstance().signOut();

export function getUserLoginStatus(): boolean {
  return gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get();
}

export function getPresentations(pageToken?: string) {
  return gapi.client.drive.files.list({
    pageSize: 10,
    q: 'mimeType="application/vnd.google-apps.presentation"',
    fields: 'nextPageToken, files(id, name, webViewLink)',
    pageToken: pageToken
  });
}

export function getPresentation(presentationId: string) {
  return gapi.client.slides.presentations.get({
    presentationId,
    fields: 'slides/objectId'
  });
}

export function getSlideThumbnail(presentationId: string, slideId: string) {
  return gapi.client.slides.presentations.pages.getThumbnail({
    presentationId,
    pageObjectId: slideId
  });
}
