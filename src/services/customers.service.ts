import { Customer } from '../types/customers.types';
import { readCustomers, readCustomerById, readCustomerByName, createCustomer, updateCustomer, deleteCustomerById } from '../data/customers.data';

const getCustomers = (): Promise<{ code: number, result: string | Customer[] }> => {
  return new Promise((resolve, reject) => {
    readCustomers()
      .then((response: Customer[]) => {
        const localCustomersDB = response;
        resolve({ code: 200, result: localCustomersDB});
      })
      .catch((error) => {
        reject({ code: 500, message: "Error inesperado "});
      });
  });
};

const getCustomerById = (id: string): Promise<{ code: number, message: string | Customer }> => {
  return new Promise((resolve, reject) => {
    readCustomerById(id)
      .then(response => {
        if((response as Customer[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, message: response as Customer });
        }
      })
      .catch(error => {
        reject({ code: 500, message: "Error inesperado "});
      });
  });
};

const getCustomerByName = (name: string): Promise<{ code: number, message: string | Customer }> => {
  return new Promise((resolve, reject) => {
    readCustomerByName(name)
      .then((response) => {
        if((response as Customer[]).length === 0){
          resolve({ code: 404 , message: 'Cliente no existe' });
        }else{
          resolve({ code: 200, message: response as Customer });
        }
      })
      .catch(error => {
        reject({ code: 500, message: "Error inesperado "});
      });
  });
};

const postCustomer = (body: Customer): Promise<{ code: number, message: string }> => {
  return new Promise((resolve, reject) => {
    createCustomer(body)
      .then((response) => {
        resolve({ code: 201, message: response as string });
      })
      .catch(error => {
        reject({ code: 500, message: "Error inesperado "});
      });
  });
};

const putCustomer = (id: string, body: Customer): Promise<{ code: number, message: string }> => {
  return new Promise((resolve, reject) => {
    updateCustomer(id, body)
      .then(response => {
        if(response === 200)(
          resolve({ code: 200, message: 'Cliente actualizado exitosamente' as string })
        );
      })
      .catch(error =>{
        if(error === 404){
          reject({ code: 404, message: 'Cliente no encontrado'});
        }else{
          reject({ code: 500, message: 'Unexpected error'});
        }
      });
  });
};

const deleteCustomer = (id: string): Promise<{ code: number, message: string }>  => {
  return new Promise((resolve, reject) => {
    deleteCustomerById(id)
      .then((response) => {
        if(response === 200){
          resolve({ code: 200, message: "Cliente borrado"});
        }
      })
      .catch((error) => {
        if(error === 404){
          reject({ code: 404, message: "Cliente no existe"});
        }else{
          reject({ code: 500, message: "Error inesperado" });
        }
      });
  });
};

export {
  getCustomers,
  getCustomerById,
  getCustomerByName,
  postCustomer,
  putCustomer,
  deleteCustomer
};
