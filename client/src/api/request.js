import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

class Request {
  constructor(endpoint, parameters = {}) {
    // Default request options for axios
    let options = {
      method: "GET",
      url: BASE_URL + endpoint,
    };

    // Add request data
    options["data"] = parameters["data"];

    // Only pass method if undefined, since it is assumed to be GET
    if (parameters["method"] !== undefined) {
      options["method"] = parameters["method"];
    }

    // Pass request body and URL parameters
    options["params"] = parameters["params"];

    // Perform the request
    axios(options).then(response => {
      if (typeof this.then !== "undefined") {
        this.then(response);
      }
    }).catch(error => {
      if (typeof this.catch !== "undefined") {
        this.catch(error);
      }
    });
  }

  catch(callback) {
    this.catch = callback;
    return this;
  }

  then(callback) {
    this.then = callback;
    return this;
  }
}

export default Request;
