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
  const userList = ref<CustomerLst>([])
  const totalElements = ref<number>(0)
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  /**
   * Handle get customers list action
   */
  const getCustomersAction = async (params: ParamsGet) => {
    try {
      //Clear error status
      hasError.value = false
      isLoading.value = true

      //Call api get customers list
      const response = await getCustomers(formatData(params))

      //Check response status
      if (response.status === CONSTANT.STATUS_CODE_SUCCESS) {
        const resData = response.data

        userList.value = formatDataArray(resData.content)
        totalElements.value = resData.totalElements
      } else {
        throw new Error(CONSTANT.SYSTEM_ERROR_MSG)
      }
    } catch (error) {
      console.error(error)
      //If has error set state
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Handle add customers list action
   */
  const addCustomerAction = async (body: BodyAdd) => {
    try {
      //Clear error status
      hasError.value = false
      isLoading.value = true

      //Format body data
      body.forEach((item: any) => {
        item = formatData(item)
      })

      //Call api add customers list
      const response = await addCustomers(body)

      //Check response status
      validateResponse(response)
    } catch (error) {
      console.error(error)
      //If has error set state
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Handle update user action
   */
  const updateCustomerAction = async (body: BodyUpdate) => {
    try {
      //Clear error status
      hasError.value = false
      isLoading.value = true

      //Format body data
      body.forEach((item: any) => {
        item = formatData(item)
      })

      //Call api updates customer
      const response = await updateCustomer(body)

      //Check response status
      validateResponse(response)

      //Update customer_name,tags in local list
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
      //If has error set state
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Handle remove customer action
   */
  const removeCustomerAction = async (params: ParamsRemove) => {
    try {
      //Clear error status
      hasError.value = false
      isLoading.value = true

      //Call api remove customer
      const response = await removeCustomer(params)

      //Check response status
      validateResponse(response)
    } catch (error) {
      console.error(error)
      //If has error set state
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
