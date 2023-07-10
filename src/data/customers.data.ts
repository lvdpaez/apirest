import { customersDB } from '../../customersDB'; 


const localCustomersDB = customersDB;

const readCustomers = (limit: string) => {
  return new Promise((resolve, reject) =>{
    try {
      resolve(localCustomersDB);
    } catch (error) {
      reject(error);
    }
  });
};

export { readCustomers };
