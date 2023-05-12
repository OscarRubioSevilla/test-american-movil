import axios from 'axios';
import { URL_BASE } from '../constants/const';
export const getChannels = async () => {
    try {
        const response = await axios.get(URL_BASE);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}