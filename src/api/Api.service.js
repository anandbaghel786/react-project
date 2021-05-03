const apiService = {
    config: {
      api: "https://jsonplaceholder.typicode.com"
    },
    httpGet: async endpoint => {
      return fetch(`${apiService.config.api}${endpoint}`, {
        headers: { "content-type": "application/json" }
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
        headers: { "content-type": "application/json" }
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
        headers: { "content-type": "application/json" }
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
        headers: { "content-type": "application/json" }
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
  
  export default apiService;
  