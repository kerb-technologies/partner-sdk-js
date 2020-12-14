# partner-sdk-js
Kerb Partner SDK for Javascript


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

# Installation

TODO

# Configuration

TODO



