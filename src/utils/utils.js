import axios from "axios";

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {}
) {
  console.log(endPoint, "endPoint");

  return new Promise(async (res, rej) => {
    if (method === "get" || method === "delete") {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, { headers })
      .then((result) => {
        const { data } = result;
        if (data.status === false) {
          return rej(data);
        }
        return res(data);
      })
      .catch((error) => {
        console.log(error?.response, "<===error in utils");
        if (error && error?.response && error?.response.status === 401) {
          return rej(error);
        }
        if (error && error.response && error.response.data) {
          if (!error.response.data.error) {
            return rej({
              ...error.response.data,
              error: error.response.data.error || "Network Error",
            });
          }
          return rej(error.response.data);
        } else {
          return rej({ error: "Network Error", message: "Network Error" });
        }
      });
  });
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, "get", headers, requestOptions);
}
