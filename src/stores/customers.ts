import { defineStore } from 'pinia'
import { CONSTANT } from '@/constants'
import {
  getCustomers,
  addCustomers,
  updateCustomer,
  removeCustomer
} from '@/services/api/customers'
import { formatDataArray, validateResponse, formatData } from '@/utils'
import { ref } from 'vue'

export const useCustomerStore = defineStore(CONSTANT.STORE_ID_GET_LIST_USERS, () => {
  const userList = ref<any>([])
  const totalElements = ref<any>(0)
  const hasError = ref<any>(false)
  const isLoading = ref<any>(false)

  const getCustomersAction = async (params: any) => {
    try {
      hasError.value = false
      isLoading.value = true

      const response = await getCustomers(formatData(params))

      if (response.status === CONSTANT.STATUS_CODE_SUCCESS) {
        const resData = response.data

        userList.value = formatDataArray(resData.content)
        totalElements.value = resData.totalElements
      } else {
        throw new Error(CONSTANT.SYSTEM_ERROR_MSG)
      }
    } catch (error) {
      console.error(error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const addCustomerAction = async (body: any) => {
    try {
      hasError.value = false
      isLoading.value = true

      body.forEach((item: any) => {
        item = formatData(item)
      })

      const response = await addCustomers(body)

      validateResponse(response)
    } catch (error) {
      console.error(error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const updateCustomerAction = async (body: any) => {
    try {
      hasError.value = false
      isLoading.value = true

      body.forEach((item: any) => {
        item = formatData(item)
      })

      const response = await updateCustomer(body)

      validateResponse(response)

      const index = userList.value.findIndex(
        (item: any) => item.customer_id === body[0].customer_id
      )

      userList.value[index] = {
        ...userList.value[index],
        customer_name: body[0].customer_name,
        tags: [body[0].tags?.toString()]
      }
    } catch (error) {
      console.error(error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  const removeCustomerAction = async (params: any) => {
    try {
      hasError.value = false
      isLoading.value = true

      const response = await removeCustomer(params)

      validateResponse(response)
    } catch (error) {
      console.error(error)
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    getCustomersAction,
    addCustomerAction,
    updateCustomerAction,
    removeCustomerAction,
    userList,
    totalElements,
    hasError,
    isLoading
  }
})
