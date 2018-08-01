import response from './results.json'
export default {
  get: jest.fn(() => Promise.resolve({data: response}))
};