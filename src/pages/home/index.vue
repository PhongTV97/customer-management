<script setup lang="ts">
import { useCustomerStore } from '@/stores/customers'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { LOCALE_KEY, CONSTANT } from '@/constants'
import { ref } from 'vue'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { showErrorMsg, getPageText, getHeaders, showSuccessMsg } from '@/utils'
import UserModel from '@/components/UserModel.vue'
import Button from '@/components/Button.vue'
import Chip from '@/components/Chip.vue'
import SearchForm from '@/components/SearchForm.vue'

const { t } = useI18n()
const useStore = useCustomerStore()
const { userList, totalElements, hasError, isLoading } = storeToRefs(useStore)
const { getCustomersAction, removeCustomerAction } = useStore
const headers = ref<any>(getHeaders(t))
const itemSelected = ref<Customer | any>()
const isRemoveMul = ref<boolean>(false)
const itemsPerPage = ref<number>(15)
const selectedRemoveItems = ref<number[]>([])
const refConfirmDialog = ref<any>(null)
const refUserModel = ref<any>(null)
const options = ref<OptionTable>({
  page: 1,
  sortBy: { key: CONSTANT.CUSTOMER_ID_KEY, order: CONSTANT.ORDER }
})
const searchCondition = ref<SearchCondition>({
  customerNameOrigin: '',
  tagsOrigin: '',
  customerName: '',
  tags: ''
})
const pageText = ref<string>('')
/**
 * Load data to table
 */
const loadItems = async (params: ConfigTable) => {
  const { page, itemsPerPage, sortBy } = params
  //Save table state
  options.value.page = page
  options.value.sortBy = sortBy[0]

  //Call api get customers list
  await getCustomersAction({
    name: searchCondition.value.customerNameOrigin,
    tags: searchCondition.value.tagsOrigin,
    page: page - 1,
    sortBy: `${sortBy[0]?.key || CONSTANT.CUSTOMER_ID_KEY}:${sortBy[0]?.order || CONSTANT.ORDER}`,
    limit: itemsPerPage
  })

  //If has error then show error message
  if (hasError.value) {
    showErrorMsg(t(LOCALE_KEY.MESSAGE_ERROR))
  } else {
    //Get pagging text under table
    pageText.value = getPageText(
      itemsPerPage,
      options.value.page,
      totalElements.value,
      t(LOCALE_KEY.PAGE_TEXT)
    )

    //Scroll to top table
    goToTopTable()
  }
}

/**
 * Show confirm dialog when remove customer item
 */
const onRemoveItem = async (item: Customer | unknown) => {
  let msg = t(LOCALE_KEY.REMOVE_MULTIPLE_ITEMS_CONFIRM_MSG)

  if (item) {
    isRemoveMul.value = false
    itemSelected.value = item
    msg = t(LOCALE_KEY.REMOVE_ITEM_CONFIRM_MSG)
  } else {
    isRemoveMul.value = true
  }

  //Show confirm dialog
  await refConfirmDialog.value.onOpen(t(LOCALE_KEY.TITLE_DIALOG_CONFIRM), msg)
}

/**
 * Remove customer
 */
const onAgree = async () => {
  //Call api remove customer
  await removeCustomerAction(
    !isRemoveMul.value ? [itemSelected.value?.customer_id] : selectedRemoveItems.value
  )

  //If has error then show error message else show success message
  if (hasError.value) {
    showErrorMsg(t(LOCALE_KEY.MESSAGE_ERROR))
  } else {
    showSuccessMsg(t(LOCALE_KEY.REMOVE_ITEM_SUCCESS_MSG))

    //Reset remove ids list
    if (isRemoveMul.value) selectedRemoveItems.value = []

    //Load data page 1
    onReloadTable()
  }
}

/**
 * Remove search condition
 */
const onClearSearchCondition = () => {
  searchCondition.value.customerName = ''
  searchCondition.value.tags = ''
}

/**
 * Search customer
 */
const onSearch = () => {
  //save search condition
  searchCondition.value.customerNameOrigin = searchCondition.value.customerName
  searchCondition.value.tagsOrigin = searchCondition.value.tags
  //Load data
  const sortBy = options.value.sortBy

  loadItems({
    page: 1,
    itemsPerPage: itemsPerPage.value,
    sortBy: [{ key: sortBy?.key, order: sortBy?.order }]
  })
}

/**
 * Open modal dialog update customer
 */
const onUpdateItem = async (item: Customer | unknown) => {
  await refUserModel.value.onOpen(item)
}

/**
 * Open modal dialog add customers
 */
const onOpenAddDialog = async () => {
  await refUserModel.value.onOpen()
}

/**
 * Reload data table
 */
const onReloadTable = async () => {
  if (options.value.page !== 1) {
    options.value.page = 1
  } else {
    let sortBy = options.value.sortBy

    const sortByParam = [
      {
        key: !sortBy ? CONSTANT.CUSTOMER_ID_KEY : sortBy.key,
        order: !sortBy ? CONSTANT.ORDER : sortBy.order
      }
    ]

    await loadItems({
      page: 1,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortByParam
    })
  }
}

/**
 * Scroll to top table
 */
const goToTopTable = () => {
  const table = document.querySelector(CONSTANT.TABLE_SELECTOR)

  if (!table) return

  table.scrollIntoView(true)
}
</script>

<template>
  <v-container>
    <v-label class="my-2">
      <v-icon>mdi-account-search</v-icon>
      <span>{{ $t(LOCALE_KEY.FIND_USER_LABEL) }}</span>
    </v-label>
    <SearchForm
      v-model:customer-name="searchCondition.customerName"
      v-model:tags="searchCondition.tags"
      @on-search="onSearch"
      @on-clear="onClearSearchCondition"
    />
    <div class="my-6">
      <div cols="12" sm="12" class="d-flex align-center">
        <Button classProp="text-white text-capitalize" @on-click="onOpenAddDialog">
          <v-icon color="white" size="small">mdi-plus-circle</v-icon>
          <span class="ml-1">{{ $t(LOCALE_KEY.ADD_BTN) }}</span>
        </Button>
        <Button
          :disabled="!selectedRemoveItems.length"
          classProp="red-bg text-white text-capitalize ml-2"
          @on-click="onRemoveItem"
        >
          <v-icon color="white" size="small">mdi-delete-circle</v-icon>
          <span class="ml-1">{{ $t(LOCALE_KEY.REMOVE_BTN) }}</span>
        </Button>
      </div>
    </div>
    <v-data-table-server
      v-model="selectedRemoveItems"
      fixed-header
      height="600"
      v-model:items-per-page="itemsPerPage"
      :item-value="CONSTANT.CUSTOMER_ID_KEY"
      :item-key="CONSTANT.CUSTOMER_ID_KEY"
      @update:options="loadItems"
      show-select
      :headers="headers"
      :items="userList"
      :items-length="totalElements"
      :loading="isLoading"
      :no-data-text="$t(LOCALE_KEY.NO_DATA_TEXT)"
      :items-per-page-text="$t(LOCALE_KEY.TOTAL_ITEM_PER_PAGE)"
      :items-per-page-options="CONSTANT.ITEM_PER_PAGE_OPTION"
      :loading-text="$t(LOCALE_KEY.LOADING_DATA)"
      :page-text="pageText"
      :page="options.page"
    >
      <template v-slot:item.tags="{ value }">
        <v-tooltip v-if="value" :text="value">
          <template v-slot:activator="{ props }">
            <div v-bind="props">
              <Chip
                v-if="value"
                :value="value"
                :numberChip="CONSTANT.NUMBER_CHIP"
                :lengthItemChip="CONSTANT.CHIP_LENGTH"
              />
            </div>
          </template>
        </v-tooltip>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-icon class="cursor-pointer" color="green" @click="onUpdateItem(item)">mdi-pencil</v-icon>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-icon class="cursor-pointer" color="red" @click="onRemoveItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table-server>
    <ConfirmDialog ref="refConfirmDialog" @on-agree="onAgree" />
    <Loading :active="isLoading" :z-index="999999" />
    <UserModel ref="refUserModel" @on-reload-table="onReloadTable" />
  </v-container>
</template>

<style lang="scss" scoped>
.v-container {
  width: 1500px;
  margin-top: 50px;
}

.v-label {
  opacity: 1;
  font-size: 25px;
}

.red-bg {
  background-color: #eb3939 !important;
}

:deep(.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th) {
  background-color: rgb(24, 103, 192);
  color: #fff;
}

:deep(.v-table .v-table__wrapper > table > tbody > tr > td) {
  border-left: thin solid #ccccccb8;
  height: 12px;
}

:deep(.v-table .v-table__wrapper > table > tbody > tr:last-child > td) {
  border-bottom: thin solid #ccccccb8;
}

:deep(.v-table .v-table__wrapper > table > tbody > tr > td:last-child) {
  border-right: thin solid #ccccccb8;
}

:deep(.v-data-table .v-table__wrapper > table > thead > tr > th.v-data-table__th--sortable:hover) {
  color: #fff;
}

:deep(.v-selection-control__input > .v-icon) {
  opacity: 1;
}

:deep(.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th) {
  border-right: thin solid #ccccccb8;
}

:deep(.v-data-table-footer__info) {
  min-width: unset;
}

:deep(.v-data-table-footer__pagination) {
  margin: 0;
}
</style>
