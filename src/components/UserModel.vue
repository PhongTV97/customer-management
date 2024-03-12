<script setup>
import { ref } from 'vue'
import TextField from '@/components/TextField.vue'
import Button from '@/components/Button.vue'
import { CONSTANT, LOCALE_KEY } from '@/constants'
import { useI18n } from 'vue-i18n'
import { useCustomerStore } from '@/stores/customers'
import { showErrorMsg, showSuccessMsg } from '@/utils'
import { storeToRefs } from 'pinia'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const useStore = useCustomerStore()
const { hasError } = storeToRefs(useStore)
const { updateCustomerAction, addCustomerAction } = useStore
const { t } = useI18n()
const visiableModal = ref(false)
const arrayItems = ref([{}])
const arrayItemsClone = ref([])
const refConfirmDialog = ref(null)
const refConfirmDialog2 = ref(null)
const isEditForm = ref(false)
const valid = ref(true)
const form = ref(null)
const emit = defineEmits(['onReloadTable'])

function onCancel() {
  visiableModal.value = false
}

/**
 * Xử lý open modal set data vào các field tương ứng
 */
function onOpen(item) {
  // set data to form edit
  if (item) {
    arrayItems.value = [{}]
    arrayItems.value[0].customer_id = item.customer_id
    arrayItems.value[0].customer_name = item.customer_name
    arrayItems.value[0].tags = item.tags?.toString()
    // create clone array to compare state change value in form
    arrayItemsClone.value = JSON.parse(JSON.stringify(arrayItems.value))
    isEditForm.value = true
  } else {
    isEditForm.value = false
    arrayItems.value = [{ customer_name: '', tags: '' }]
  }

  visiableModal.value = true
}

/**
 * check and disable button save
 */
function disabledBtnSave() {
  if (isEditForm.value) {
    const isNotChange =
      arrayItems.value[0].customer_name === arrayItemsClone.value[0].customer_name &&
      arrayItems.value[0].tags === arrayItemsClone.value[0].tags

    if (isNotChange) return true
  } else {
    if (
      arrayItems.value.every(item => !item.customer_name) &&
      arrayItems.value.every(item => !item.tags)
    ) {
      return true
    }
  }

  return !valid.value
}

/**
 * open dialog confirm
 */
async function onSave() {
  await form.value.validate()

  if (!valid.value) return

  await refConfirmDialog.value.onOpen(
    t(LOCALE_KEY.TITLE_DIALOG_CONFIRM),
    t(LOCALE_KEY.UPDATE_DATA_CONFIRM_MSG)
  )
}

/**
 * xử lý sự kiện bấm button Ok trên dialog confirm
 */
async function onAgree() {
  if (isEditForm.value) {
    //call api update data
    await updateCustomerAction(arrayItems.value)
  } else {
    //filter all item have customer_name is not empty and call api add data
    const arrAdd = arrayItems.value.filter(item => item.customer_name)

    await addCustomerAction(arrAdd)
  }

  //kiểm tra lỗi và hiển thị message toast tương ứng
  if (hasError.value) {
    showErrorMsg(t(LOCALE_KEY.MESSAGE_ERROR))
  } else {
    showSuccessMsg(t(LOCALE_KEY.MESSAGE_UPDATE_SUCCESS))
  }

  //reload table to page 1
  emit('onReloadTable')

  visiableModal.value = false
}

/**
 * Add item to form
 */
function onAddItem() {
  arrayItems.value.push({ customer_name: '', tags: '' })
}

/**
 * Remove item in form
 */
function onRemoveItem(index) {
  if (arrayItems.value.length === 1) return

  arrayItems.value.splice(index, 1)
}

/**
 * Check required
 */
function checkRequired(item) {
  return !(!isEditForm.value && !item.tags)
}

defineExpose({
  onOpen
})
</script>

<template>
  <v-dialog v-model="visiableModal" width="1000">
    <v-card>
      <v-card-title class="headline black pa-5" primary-title>
        <v-icon>mdi-account-edit</v-icon>
        {{ $t(LOCALE_KEY[isEditForm ? 'TITLE_EDIT_CUSTOMER_MODAL' : 'TITLE_ADD_CUSTOMER_MODAL']) }}
      </v-card-title>
      <v-card-text class="card-text" ref="refConfirmDialog2">
        <v-form ref="form" v-model="valid">
          <v-row v-for="(item, index) in arrayItems" class="d-flex justify-center">
            <v-col cols="12" sm="5">
              <TextField
                :label="$t(LOCALE_KEY.USER_NAME_LABEL)"
                v-model:value="item.customer_name"
                :counter="CONSTANT.CUSTOMER_NAME_LENGTH"
                :required="checkRequired(item)"
              />
            </v-col>
            <v-col cols="12" sm="5">
              <TextField
                :label="$t(LOCALE_KEY.TAGS)"
                v-model:value="item.tags"
                :hint="$t(LOCALE_KEY.NOTICE_TAGS)"
              />
            </v-col>
            <v-col v-if="!isEditForm" cols="12" sm="1">
              <v-icon color="red" class="mt-2 cursor-pointer" @click="onRemoveItem(index)">
                mdi-minus-circle
              </v-icon>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pt-2 pb-5 pl-5 d-flex justify-end mr-12">
        <Button v-if="!isEditForm" color="green" @on-click="onAddItem" class="ml-11">
          <v-icon>mdi-plus-circle</v-icon>
        </Button>
        <Button @on-click="onCancel" variant="outlined">
          <v-icon small>mdi-close-circle</v-icon>
          <span>
            {{ $t(LOCALE_KEY.CANCEL_BTN) }}
          </span>
        </Button>
        <Button @on-click="onSave" :disabled="disabledBtnSave()">
          <v-icon small>mdi-content-save</v-icon>
          <span>
            {{ $t(LOCALE_KEY.SAVE_BTN) }}
          </span>
        </Button>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <ConfirmDialog ref="refConfirmDialog" @on-agree="onAgree" />
</template>

<style>
.card-text {
  max-height: 500px;
  overflow: auto;
}
</style>
