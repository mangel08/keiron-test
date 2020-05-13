import API from "../util/api";

let api = new API();

export default {
  getUsersWithType: async () => {
    return new Promise((resolve, reject) => {
      api
        .get(`users/typeUser`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  },
};
