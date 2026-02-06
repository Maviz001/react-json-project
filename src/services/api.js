import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginUser=(email,password)=>{
 return axios.get(`${API}/users?email=${email}&password=${password}`);
};

export const getCases=()=>{
 return axios.get(`${API}/cases`);
};

export const addCase=(data)=>{
 return axios.post(`${API}/cases`,data);
};

export const deleteCase=(id)=>{
 return axios.delete(`${API}/cases/${id}`);
};

export const updateCase=(id,data)=>{
 return axios.put(`${API}/cases/${id}`,data);
};
