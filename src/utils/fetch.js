import store from "../store";

export const getAsync = (url) =>
  fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  }).then((res) => {
    return res.json();
  });

export const deleteAsync = (url) =>
  fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  }).then((res) => {
    return res.json();
  });

export const postAsJsonAsync = (url, body) => {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (res.status === 403) {
      throw new Error("Forbidden");
    }

    if (!res.ok) {
      throw new Error(
        `Http error! \nStatus: ${res.status}  \n Error: ${res.toString()} `
      );
    }
    return res.json();
  });
};

export const postAsFormAsync = (url, body) => {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
    body: body,
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (res.status === 403) {
      throw new Error("Forbidden");
    }

    if (!res.ok) {
      throw new Error(
        `Http error! \nStatus: ${res.status}  \n Error: ${res.toString()} `
      );
    }
    return res.json();
  });
};

export const putAsJsonAsync = (url, body) => {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: "PUT",

    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (res.status === 403) {
      throw new Error("Forbidden");
    }

    if (!res.ok) {
      throw new Error(
        `Http error! \nStatus: ${res.status}  \n Error: ${res.toString()} `
      );
    }
    return res.json();
  });
};

export const putAsFormAsync = (url, body) => {
  return fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
    body: body,
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (res.status === 403) {
      throw new Error("Forbidden");
    }

    if (!res.ok) {
      throw new Error(
        `Http error! \nStatus: ${res.status}  \n Error: ${res.toString()} `
      );
    }
    return res.json();
  });
};
