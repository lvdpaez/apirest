import { customersDB } from '../../customersDB'; // Se importa el arreglo de clientes, especificando el path relativo al archivo donde se encuentra el arreglo.
import { Customer } from '../types/customers.types';

let localCustomersDB = customersDB; // Se guarda el arreglo de clientes en una variable local.


// Se define la función que obtiene los clientes. Puede recibir un límite para la cantidad de clientes que se devuelven.
const readCustomers = (): Promise<Customer[]> => { // Se define el tipo de dato que devuelve la función, en este caso una promesa que devuelve un arreglo de clientes.
  return new Promise((resolve, reject) => { // Se devuelve una promesa para manejar el asincronismo.
    try {
      resolve(localCustomersDB); // Se devuelve el arreglo de clientes.
    } catch (error) { // Si hay un error, se devuelve el error.
      reject(error); // Se devuelve el error.
    }
  });
};

const readCustomerById = (id: string) =>{
  return new Promise((resolve, reject) => {
    try {
      const result = localCustomersDB.filter(item => item.id === id); // Se filtra el arreglo de clientes para obtener el cliente con el id solicitado.
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const readCustomerByName = (name: string) =>{
  return new Promise((resolve, reject)=> {
    try {
      const result = localCustomersDB.filter(item => item.name === name); // Se filtra el arreglo de clientes para obtener el cliente con el nombre solicitado.
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const createCustomer = (body: Customer) => {
  return new Promise((resolve, reject) => {
    try {
      localCustomersDB.push(body);  // Se agrega el cliente al arreglo local.
      resolve('Se ha agregado cliente');
    } catch (error) {
      reject(error);
    }
  });
};

const updateCustomer = (id: string, body: Customer) => {
  return new Promise((resolve, reject) => {
    try {
      const customerIndex = localCustomersDB.findIndex(item => item.id === id); // Se busca el índice del cliente a actualizar dentro del arreglo.
      if(customerIndex === -1){ // Si el índice es -1, significa que no existe un cliente con ese id.
        reject(404);
      }else{
        localCustomersDB[customerIndex] = body; // Si el índice es diferente a -1, se actualiza el cliente en el arreglo local.
        resolve(200);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCustomerById = (id: string) => {
  return new Promise((resolve, reject) => {
    try {
      const result = localCustomersDB.filter(item => item.id !== id); // Se filtra el arreglo de clientes para obtener todos los clientes que no tengan el id solicitado.
      if(result.length === localCustomersDB.length){ // Si el arreglo resultante tiene la misma cantidad de clientes que el arreglo original, significa que no se eliminó ningún cliente.
        reject(404);
      } else{
        localCustomersDB = result;
        resolve(200);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { 
  readCustomers,
  readCustomerById,
  readCustomerByName,
  createCustomer,
  updateCustomer,
  deleteCustomerById
}; // Se exporta la función para que pueda ser usada en otros archivos.
