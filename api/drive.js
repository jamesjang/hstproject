const fs = require('fs');
const readline = require('readline');
const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');
const XLSX = require('xlsx');
const randomInt = require('random-int');

const gdrive = google.drive('v3');

const xlsxTemplate = 'LT_Template.xlsx';

let auth;

var state = {
    files: null
  }

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const credentials = require('./credentials.json');

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {

  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  if (err) return console.log('Error loading client secret file:', err);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) 
      return getAccessToken(oAuth2Client);

    oAuth2Client.setCredentials(JSON.parse(token));
    
    auth = oAuth2Client;

    listFiles();
  });

  // Authorize a client with credentials, then call the Google Drive API.
});



function authorize(credentials, callback) {

  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) 
      return getAccessToken(oAuth2Client);

    oAuth2Client.setCredentials(JSON.parse(token));
    
    auth = oAuth2Client;
  });
}


function listFiles() {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    q: "trashed =false",
    pageSize: 20,
    fields: 'nextPageToken, files(id, name, webViewLink, createdTime)'
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;

    state.files = files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });

  return state.files;
}

function removeFile (req) {
  const id = req.params.id;

  const drive = google.drive({ version: 'v3', auth });

  drive.files.delete({
    "fileId" : id,
  }, function (err, file) {
    if (err)
      console.log(err);
      else
      console.log("trashed id" + id);
  })
}

function getFiles() {

    listFiles();
    console.log(state.files);
    return state.files;
}

function downloadFiles(auth) {

}

async function uploadFile(req) {

  var workBook = XLSX.readFile(xlsxTemplate);

  const wsname = workBook.SheetNames[0];
  const ws1 = workBook.Sheets[wsname];
  var today = new Date();

  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var randomSeed = randomInt(1000);

  var fileName = date +"_" +randomSeed+ "_LT_File"

  XLSX.utils.sheet_add_json(ws1, req.body);

  XLSX.writeFile(workBook, 'out.xlsx');

  console.log('calling upload file' + auth);
 // Authenticating drive API
 const drive = google.drive({ version: 'v3', auth });
  
  var fileMetadata = {
    'name' : fileName,
    'mimeType' : 'application/vnd.ms-excel'
  };

  var media = {
    mimeType: 'aloha/csv',
    body: fs.createReadStream('out.xlsx')
  }
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {

      const fileID = file.data.id;

      console.log("file id uploaded " + fileID);

      createPermissions(fileID);

    }
  });
}

function createPermissions(fileID) {

  const drive = google.drive({ version: 'v3', auth });
  drive.permissions.create({
    fileId: fileID,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      }
    }, function(err, res) {
      if (err) {

      } else {
        console.log("created perm" + res.data)
      }
    });

    console.log("editing permissions ");
  }

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      auth = oAuth2Client;
    });
  });
}


module.exports = {
    listFiles,
    getFiles,
    downloadFiles,
    uploadFile,
    removeFile
}