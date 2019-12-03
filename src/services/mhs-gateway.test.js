import axios from 'axios';
import { sendMessage } from './mhs-gateway';
import config from '../config';

jest.mock('axios', () => ({ post: jest.fn().mockResolvedValue('some-response') }));
jest.mock('../config/logging');

describe('mhs-gateway', () => {
  describe('sendMessage', () => {
    it('should send message to MHS', () => {
      return sendMessage('some message').then(() => {
        expect(axios.post).toHaveBeenCalledWith(
          config.mhsUrl,
          { payload: 'some message' },
          {
            headers: {
              'Interaction-Id': 'QUPA_IN040000UK32',
              'sync-async': false,
              'Content-Type': 'application/json'
            }
          }
        );
      });
    });

    it('should return the response body', () => {
      return sendMessage('some-message').then(response => {
        expect(response).toEqual('some-response');
      });
    });

    it('should re-throw error after logging', () => {
      axios.post.mockRejectedValue(new Error('some-error'));

      return expect(sendMessage('some-message')).rejects.toThrow(new Error('some-error'));
    });
  });
});
