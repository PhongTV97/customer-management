type Customer = {
  customer_id: number
  customer_name: string
  tags: string[]
  created_at: string
  updated_at: string
  deleted_flg: boolean
}

type CustomerLst = Customer[]

type ParamsRemove = number[]

type ParamsGet = {
  limit: number
  name: string
  page: number
  sortBy: string
  tags: []
}

type ItemAdd = {
  customer_name: string
  tags: string[]
}

type BodyAdd = ItemAdd[]

type ItemUpdate = {
  customer_id: string
  customer_name: string
  tags: string[]
}

type BodyUpdate = ItemUpdate[]

type SortBy = {
  key: string
  order: string
}

type OptionTable = {
  page: number
  sortBy: SortBy
}

type TableConfig = {
  page: number
  itemsPerPage: number
  sortBy: SortBy[]
}
