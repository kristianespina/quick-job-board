import axios from "axios";
const baseUrl = process.env.REACT_APP_API_HOST;

export const apiRequest = async ({ endpoint, method, payload }) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      url: baseUrl + endpoint,
      method: method,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: payload,
    };
    try {
      const response = await axios(options);
      resolve(response);
    } catch (e) {
      resolve([]);
    }
  });
};