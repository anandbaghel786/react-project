// import dataService from "../_services/_dataService";


const apiService = {
    config: {
      api: "http://localhost:5000/v1"
    },
    httpGet: async endpoint => {
      return fetch(`${apiService.config.api}${endpoint}`, {
        headers: header()
      })
        .then(response => handleResponse(response))
        .then(response => response)
        .catch(error => {
          console.error(error);
          throw Error(error); 
        });
    },
    httpPost: async (endpoint, data) => {
      return fetch(`${apiService.config.api}${endpoint}`, {
        method: "post",
        body: data ? JSON.stringify(data) : null,
        headers: header()
      })
        .then(response => handleResponse(response))
        .then(response => response)
        .catch(error => {
          console.error(error);
          throw Error(error);
        });
    },
    httpPut: async (endpoint, data) => {
      return fetch(`${apiService.config.api}${endpoint}`, {
        method: "put",
        body: data ? JSON.stringify(data) : null,
        headers: header()
      })
        .then(response => handleResponse(response))
        .then(response => response)
        .catch(error => {
          console.error(error);
          throw Error(error);
        });
    },
    httpDelete: async (endpoint, data) => {
      return fetch(`${apiService.config.api}${endpoint}`, {
        method: "delete",
        headers: header()
      })
        .then(response => handleResponse(response))
        .then(response => response)
        .catch(error => {
          console.error(error);
          throw Error(error);
        });
    }
  };
  
  
  const handleResponse = response => {
    // You can handle 400 errors as well.
    if (response.status === 200) {
      return response.json();
    } else {
      throw Error( response.json()| "error");
    }
  };

  const header = () => {
    return { "content-type": "application/json" };
  }
  
  export default apiService;
  