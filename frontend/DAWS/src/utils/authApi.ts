import {API} from "./axios";    

export const registerUser = async(data : {name: string ; email: string; password: string })=>{
return await API.post('/auth/register', data);
}

export const loginUser = async (data: any) => {
  return await API.post("/auth/login", data);
};