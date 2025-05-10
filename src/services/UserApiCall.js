import axios from "axios";
import toast from 'react-hot-toast'

async function LoginAPI(data) {
    try {

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/login";

        let loginData = await axios.post(baseUrl, data);

        console.log("Login Data............", loginData);

        toast.success("Login Successfully....");

        return loginData;

    } catch (error) {
        console.log("Error occured in Login().....", error);
        toast.error(error?.response?.data?.message || "Login Failed....");

    }
}

async function getUsers(token) {
    try {

        const baseUrl = import.meta.env.VITE_DOMAIN_URL + "auth/users";

        let userList = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log("UserList............", userList);

        return userList;

    } catch (error) {
        console.log("Error occured in getUsers().....", error);
    }
}

export { LoginAPI, getUsers };