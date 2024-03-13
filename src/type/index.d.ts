type Customer = {
  customer_id: number
  customer_name: string
  tags: string
  created_at: string
  updated_at: string
  deleted_flg: boolean
}

type CustomerList = Customer[]

type IDRemove = number[]

type CustomerGet = {
  limit: number
  name: string
  page: number
  sortBy: string
  tags: string
}

type CustomerGetApi = {
  limit: number
  name: string
  page: number
  sortBy: string
  tags: string[]
}

type CustomerForm = {
  customer_id: number | null
  customer_name: string
  tags: string
}

type CustomerAdd = CustomerForm[]

type CustomerFormArray = CustomerForm[]

type SortBy = {
  key: string
  order: string
}

type OptionTable = {
  page: number
  sortBy: SortBy
}

type ConfigTable = {
  page: number
  itemsPerPage: number
  sortBy: SortBy[]
}

type SearchCondition = {
  customerNameOrigin: string
  tagsOrigin: string
  customerName: string
  tags: string
}
