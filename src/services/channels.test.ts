import { it, expect, describe } from 'vitest'
import { getChannels } from './channels';
import { setDateToString } from '../utils/utils';
import moment from 'moment';

describe('getChannels', () => { 
    it('should return a error_invalid_date', async () => {
        const date_from = '2023-05-15';
        const date_to = '2023-05-16';
    
        const response = await getChannels({date_from, date_to});
     
        expect(response.errors.error[0], 'error_invalid_date')
        expect(response.errors.code, 'error_params')
      });

    it('should return a list of channels', async () => {
       const date_from = setDateToString(moment());
       const date_to =   setDateToString(moment().add(1, 'day'))
      const { response } = await getChannels({date_from, date_to});
 
      expect(response).toBeDefined();
      expect(response.channels).toBeDefined();
      expect(response.channels.length).toBeGreaterThan(0);
    });
  
    it('should throw an error if the date_from is invalid', async () => {
      const date_from = '2023-05-32';
      const date_to = '2023-05-16';
  
      try {
        await getChannels({date_from, date_to});
      } catch (error: any) {
        expect(error.message).toBe('Invalid date');
      }
    });
  });