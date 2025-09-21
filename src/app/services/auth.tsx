import { baseUrl } from "../../../utils/baseurl";
import axios from "axios";

type Credentials = {
    email: string
    password: string
}

type UserDetails = {
    name: string
    password: string
    email: string
}
export const fetchLoginDetails = async (credentials: Credentials) => {
    const url = `${baseUrl}/users/login`;
    try {
        const response = await axios.post(url, credentials);
        return response
    }catch(e){
        return e
    }
};

export const registerUserDetails = async (userDetails: UserDetails) => {
    const url = `${baseUrl}/users/register`;
    try {
        const response = await axios.post(url, userDetails);
        return response
    }catch(e){
        return e
    }
};