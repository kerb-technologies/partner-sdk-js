![npm](https://img.shields.io/npm/v/kerb-partner)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/kerb-technologies/partner-sdk-js/Publish%20as%20Node%20Package)

# partner-sdk-js
Kerb Partner SDK for Javascript

## documentations

Detail documentation can be found at https://platform.kerb.works

## installation

Using npm
`npm install --save kerb-partner`

Using yarn
`yarn add kerb-partner`






## example


```javascript
import * as partner from 'kerb-partner';

// set KERB_PARTNER_HOST in your environment
// get your token from your kerb dashboard app
const token = <your-token>
partner.setApiKey(token);

const options = {
    body: []
}
// partner.send use partner.request while do http request
// since we use axios for http request, so return is axion response
// see this for more information https://github.com/axios/axios#response-schema

partner.send('ping', options).then(response => {
    // do something with response
});

// use custom request object
const request = partner.makeRequest('ping', options)
request.headers = {
    'testign': 'ok',
    'not-used': null,
}

partner.send('ping', options).then(response => {
    // do something with response
}).catch(error => {
});


```
