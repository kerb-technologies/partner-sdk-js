import axios from "axios";
import * as partner from "../dist/index.js";
import * as exceptions from "../dist/exceptions.js";

jest.mock("axios");

// check  KERB_PARTNER_HOST
const ok = typeof process.env.KERB_PARTNER_HOST === "string";
if (!ok)
  throw new Error(
    "You didnt provide KERB_PARTNER_HOST at env, test will be stop"
  );

describe("Exception test", () => {
  test("EmptyApiHost", () => {
    const apiHost = process.env.KERB_PARTNER_HOST;
    delete process.env.KERB_PARTNER_HOST;
    expect(() => partner.getApiHost()).toThrow(exceptions.EmptyApiHost);
    // put it back
    process.env.KERB_PARTNER_HOST = apiHost;
    expect(partner.getApiHost()).toBe(apiHost);
  });

  test("EmptyApiKey", () => {
    expect(() => partner.getApiKey()).toThrow(exceptions.EmptyApiKey);

    // set api key
    const apiKey = "api-key";
    partner.setApiKey(apiKey);
    expect(partner.getApiKey()).toBe(apiKey);
  });

  test("InvalidRequestName", () => {
    expect(() => partner.makeRequest("not-exist")).toThrow(
      exceptions.InvalidRequestName
    );
  });

  test("RotatedApiKey", () => {
    const timestamp = 1608312524;
    const data = {
      status: 200,
      headers: {
        "KERB-APIKEY-EXPIRE-AT": timestamp,
      },
      data: {},
    };

    axios.create.mockImplementation((config) => axios);
    axios.request.mockImplementation(() => Promise.resolve(data));

    expect.assertions(1);

    partner.setConfig('throwAtRotatedKey', true)
    partner.send("ping").catch((e) => {
      let err = new exceptions.RotatedApiKeyError(timestamp)
      expect(e).toBe(err);
    });

    // this test should respect config value
    partner.setConfig('throwAtRotatedKey', false)
    partner.send("ping").then(response => {
      expect(response.status).toBe(200);
    });
  });
});
