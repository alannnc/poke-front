import axios from "axios";

import clientConfig from "../utils/clientConfig";

export class Http {
  constructor() {
    // Default is localhost for SSR with custom port
    let baseUrl = `${clientConfig.baseUrl}:${clientConfig.port}`;
    // If request is NOT SSR
    if (typeof document !== "undefined") {
      // Use config url with custom port
      baseUrl = `http://localhost:3000/api`;
    }

    const axiosConfigRequest = {
      baseURL: `${baseUrl}/`,
      headers: {
        Accept: "application/json"
      }
    };
    this.http = axios.create(axiosConfigRequest);
  }

  get(url, axiosConfig) {
    return this.http
      .get(url, axiosConfig || {})
      .then(res => res.data)
      .catch(error => Promise.reject(this.mapErrorResponse(error)));
  }

  post(url, data, axiosConfig) {
    return this.http
      .post(url, data, axiosConfig || {})
      .then(res => res.data)
      .catch(error => Promise.reject(this.mapErrorResponse(error)));
  }

  put(url, data, axiosConfig) {
    return this.http
      .put(url, data, axiosConfig || {})
      .then(res => res.data)
      .catch(error => Promise.reject(this.mapErrorResponse(error)));
  }

  delete(url, axiosConfig) {
    return this.http
      .delete(url, axiosConfig || {})
      .then(res => res.data)
      .catch(error => Promise.reject(this.mapErrorResponse(error)));
  }

  mapErrorResponse(error) {
    if (error && error.response) {
      const errorData = {
        statusCode: error.response.status,
        error: error.response.data.error,
        message: error.response.data.message
      };
      return errorData;
    }
    return error;
  }
}
