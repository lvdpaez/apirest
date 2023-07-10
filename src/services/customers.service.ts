/*
En la capa de servicio o gestión de lógica de negocio se hacen validaciones, cálculos y en general la gestión de los algoritmos que se requieran para el funcionamiento de la aplicación. 
*/
import { readCustomers } from '../data/customers.data';
// import type { Customer } from '../../customersDB';

// Esta función se encarga de obtener los clientes.
const getCustomers = (limit: string) => {
  return new Promise((resolve, reject) => {
    readCustomers(limit)
      .then((response: unknown) => {

        const localCustomersDB = response;
        resolve(localCustomersDB);
      })
      .catch((error: unknown) => {
        reject(error);
      });
  });
};

// const getCustomerByName

// const postCustomer

// const putCustomer

// const deleteCustomer

// const patchCustomer

export { getCustomers };