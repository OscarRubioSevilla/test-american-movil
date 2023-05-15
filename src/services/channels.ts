import axios from 'axios';
import { URL_BASE } from '../constants/const';


export interface ChannelProps {
    date_from: string, 
    date_to: string
}

export const getChannels = async ({date_from, date_to}: ChannelProps) => {
    try {
        const response = await axios.get(URL_BASE.replace('#date_from#', date_from).replace('#date_to#', date_to));
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}