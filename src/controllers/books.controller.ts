import { customersDB } from '../../customersDB';

const localCustomersDB = customersDB;

const readCustomers = (limit: string) => {
  return new Promise((resolve, reject) => {
    try {
     
      const parsedLimit = parseInt(limit);
      const result = parsedLimit
        ? localCustomersDB.slice(0, parsedLimit)
        : localCustomersDB;

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export { readCustomers };
