# partner-sdk-js
Kerb Partner SDK for Javascript



```
import * as partner from 'kerb-partner';

const token = <your-token>
partner.setApiKey(token);

const options = {
    body: []
}
// partner.send use partner.request while do http request
// since we use axios for http request, so return is axion response
// see this for more information https://github.com/axios/axios#response-schema
try {

}
const response = await partner.send('ping', options)


// use custom request object
const request = partner.makeRequest('ping', options)
request.setHeader('testing', 'ok')
request.setHeader('not-userd', undefined)

const response = await partner.request(request)


```
