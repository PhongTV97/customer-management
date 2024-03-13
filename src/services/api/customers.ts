import request from '../request'
import { API_PATH } from '@/constants'

/**
 * Call api get customers list
 */
const getCustomers = async (params: ParamsGet) => {
  return await request.get(API_PATH.CUSTOMER, { params })
}

/**
 * Call api add customers
 */
const addCustomers = async (body: BodyAdd) => {
  return await request.post(API_PATH.CUSTOMER, body)
}

/**
 * Call api update customer
 */
const updateCustomer = async (body: BodyUpdate) => {
  return await request.put(API_PATH.CUSTOMER, body)
}

/**
 * Call api remove customer
 */
const removeCustomer = async (params: ParamsRemove) => {
  return await request.delete(`${API_PATH.CUSTOMER}/${params.toString()}`)
}

export { getCustomers, addCustomers, updateCustomer, removeCustomer }
