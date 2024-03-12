import request from '../request'
import { API_PATH } from '@/constants'

const getCustomers = async (params: ParamsGet) => {
  return await request.get(API_PATH.CUSTOMER, { params })
}

const addCustomers = async (body: BodyAdd) => {
  return await request.post(API_PATH.CUSTOMER, body)
}

const updateCustomer = async (body: BodyUpdate) => {
  return await request.put(API_PATH.CUSTOMER, body)
}

const removeCustomer = async (params: ParamsRemove) => {
  return await request.delete(`${API_PATH.CUSTOMER}/${params.toString()}`)
}

export { getCustomers, addCustomers, updateCustomer, removeCustomer }
