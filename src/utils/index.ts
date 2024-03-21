import { LOCALE_KEY, CONSTANT } from '@/constants'
import { createToaster } from '@meforma/vue-toaster'
const toaster = createToaster({
  position: 'top-right',
  duration: 2000
})
import moment from 'moment'

/**
 * Show error message toast
 */
export const showErrorMsg = (msg: string) => {
  toaster.error(msg)
}

/**
 * Show success message toast
 */
export const showSuccessMsg = (msg: string) => {
  toaster.success(msg)
}

/**
 * Get page text under table pagging
 */
export const getPageText = (
  itemsPerPage: number,
  page: number,
  totalElements: number,
  text: string
) => {
  if (!totalElements) return ''

  return (
    (page === 1 ? 1 : 1 + (page - 1) * itemsPerPage) +
    '-' +
    (page * itemsPerPage > totalElements ? totalElements : page * itemsPerPage) +
    ` ${text}/` +
    totalElements +
    ` ${text}`
  )
}

/**
 * Create headers to table
 */
export const getHeaders = (t: any) => {
  return [
    {
      title: 'ID',
      key: 'customer_id',
      align: 'center',
      width: '10%'
    },
    {
      title: t(LOCALE_KEY.USER_NAME_LABEL),
      key: 'customer_name',
      align: 'center',
      width: '20%'
    },
    {
      title: t(LOCALE_KEY.TAGS),
      key: 'tags',
      sortable: false,
      align: 'center',
      width: '30%'
    },
    {
      title: t(LOCALE_KEY.CREATED_DATE_LABEL),
      key: 'created_at',
      align: 'center',
      width: '15%'
    },
    {
      title: t(LOCALE_KEY.UPDATED_DATE_LABEL),
      key: 'updated_at',
      align: 'center',
      width: '15%'
    },
    {
      title: t(LOCALE_KEY.EDIT_LABEL),
      sortable: false,
      value: 'edit',
      align: 'center',
      width: '5%'
    },
    {
      title: t(LOCALE_KEY.DELETE_LABEL),
      sortable: false,
      value: 'delete',
      align: 'center',
      width: '5%'
    }
  ]
}

/**
 * Format created_at, updated_at to YYYY/MM/DD hh:mm
 */
export const formatDataArray = (arr: CustomerList) => {
  return arr.map((ele: Customer) => {
    return {
      ...ele,
      tags: ele.tags?.toString(),
      created_at: moment(ele.created_at).format(CONSTANT.DATE_FORMAT),
      updated_at: moment(ele.updated_at).format(CONSTANT.DATE_FORMAT)
    }
  })
}

/**
 * Check response status if status different 200 throws error
 */
export const validateResponse = (response: any) => {
  if (response.status === CONSTANT.STATUS_CODE_SUCCESS) return

  throw new Error(CONSTANT.SYSTEM_ERROR_MSG)
}

/**
 * Format tags from string to arrays type
 */
export const formatData = (body: any) => {
  body.tags = !body.tags ? [''] : body.tags.split(',')

  return body
}
