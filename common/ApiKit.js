import HttpKit from "./HttpKit";

const { client } = HttpKit;

const defaultFileUploadConfig = {
  headers: { "Content-Type": "multipart/form-data" },
};

const ApiKit = {
  auth: {
    register: (payload) => {
      const url = "/auth/register";
      return client.post(url, payload);
    },
    login: (payload) => {
      const url = "/auth/login";
      return client.post(url, payload);
    },
    getMe: () => {
      const url = "/auth/me";
      return client.get(url);
    },
  },

  nid: {
    create: (payload) => {
      const url = "/nids";
      return client.post(url, payload, defaultFileUploadConfig);
    },
    getNidByKey: (key) => {
      const url = `/nids/${key}`;
      return client.get(url);
    },
    getALlNidsByUserId: (userId) => {
      const url = `/nids/user/${userId}`;
      return client.get(url);
    },
  },

  user: {
    getUsers: (params) => {
      const url = "/users";
      return client.get(url, { params });
    },
  },
};

export default ApiKit;
