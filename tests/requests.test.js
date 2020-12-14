import * as requests from "../dist/requests.js";

// this test for checking all requests name

describe('Validate request object', () => {
  Object.entries(requests).forEach(([name, request]) => {
    test(`${name}`, () => {
      let obj = new request()

      // method and url is required on create request object
      expect(typeof obj.method).toBe('string')
      expect(typeof obj.url).toBe('string')
    })
  })
})
