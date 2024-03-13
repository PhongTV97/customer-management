import request from '../request'
import { API_PATH } from '@/constants'
import { formatData } from '@/utils'

/**
 * Call api get customers list
 */
const getCustomers = async (params: CustomerGetApi) => {
  return await request.get(API_PATH.CUSTOMER, { params })
}

/**
 * Call api add customers
 */
const addCustomers = async (body: CustomerAdd) => {
  //Format body data
  body.forEach((item: CustomerForm) => {
    item = formatData(item)
  })

  return await request.post(API_PATH.CUSTOMER, body)
}

/**
 * Call api update customer
 */
const updateCustomer = async (body: CustomerAdd) => {
  //Format body data
  body.forEach((item: CustomerForm) => {
    item = formatData(item)
  })

  return await request.put(API_PATH.CUSTOMER, body)
}

/**
 * Call api remove customer
 */
const removeCustomer = async (params: IDRemove) => {
  return await request.delete(`${API_PATH.CUSTOMER}/${params.toString()}`)
}

export { getCustomers, addCustomers, updateCustomer, removeCustomer }
