const request = require("supertest");
const app = require("../../app");

class TestAxios {
  constructor() {
    this.request = request(app);
  }

  /**
   * Send a POST request using supertest
   * @param {String} route - the route to send the http request to
   * @param {Object} payload - the payload to include in the request
   * @returns the response from this request
   */
  async post(route, payload) {
    return await this.request.post(route).send(payload);
  }

  async get(route) {
    return await this.request.get(route);
  }

  async patch(route, payload) {
    return await this.request.patch(route).send(payload);
  }
}

module.exports = TestAxios;
