<script setup lang="ts">
/**
 * @author : PhongTV
 * @since : 3/7/2024, Thu
 */

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
const visiableModal = ref<boolean>(false)
const arrayItems = ref<CustomerFormArray>([])
const arrayItemsClone = ref<CustomerFormArray>([])
const refConfirmDialog = ref<any>(null)
const isEditForm = ref<boolean>(false)
const isValid = ref<boolean>(true)
const refForm = ref<any>(null)
type Emits = {
  (e: 'onReloadTable'): void
}
const emit = defineEmits<Emits>()

/**
 * Handle close dialog modal
 */
const onCancel = () => {
  visiableModal.value = false
}

/**
 * Handle the open dialog modal, sets data into the corresponding fields
 */
const onOpen = (item: Customer) => {
  arrayItems.value = [{ customer_id: null, customer_name: '', tags: '' }]

  //Set data to form edit
  if (item) {
    arrayItems.value[0] = {
      ...arrayItems.value[0],
      customer_id: item.customer_id,
      customer_name: item.customer_name,
      tags: item.tags
    }
    //Create clone array to compare state change value in form
    arrayItemsClone.value = JSON.parse(JSON.stringify(arrayItems.value))
    isEditForm.value = true
  } else {
    isEditForm.value = false
  }

  visiableModal.value = true
}

/**
 * Check and disable the save button
 */
const disabledBtnSave = () => {
  if (isEditForm.value) {
    const isNotChange =
      arrayItems.value[0].customer_name === arrayItemsClone.value[0].customer_name &&
      arrayItems.value[0].tags === arrayItemsClone.value[0].tags

    if (isNotChange) return true
  } else {
    if (arrayItems.value.every((item: CustomerForm) => !item.customer_name && !item.tags)) {
      return true
    }
  }

  return !isValid.value
}

/**
 * Open dialog confirm
 */
const onSave = async () => {
  await refForm.value.validate()

  if (!isValid.value) return

  await refConfirmDialog.value.onOpen(
    t(LOCALE_KEY.TITLE_DIALOG_CONFIRM),
    t(LOCALE_KEY.UPDATE_DATA_CONFIRM_MSG)
  )
}

/**
 * Handle the Ok button click event on the confirmation dialog
 */
const onAgree = async () => {
  if (isEditForm.value) {
    //Call api update data
    await updateCustomerAction(arrayItems.value)
  } else {
    //Filter all item have customer_name is not empty and call api add data
    const arrAdd = arrayItems.value.filter((item: CustomerForm) => item.customer_name)

    await addCustomerAction(arrAdd)
  }

  //Check for errors and display the corresponding toast message
  if (hasError.value) {
    showErrorMsg(t(LOCALE_KEY.MESSAGE_ERROR))
  } else {
    showSuccessMsg(t(LOCALE_KEY.MESSAGE_UPDATE_SUCCESS))

    //Reload table to page 1
    emit('onReloadTable')

    visiableModal.value = false
  }
}

/**
 * Add item to form
 */
const onAddItem = () => {
  arrayItems.value.push({ customer_id: null, customer_name: '', tags: '' })
}

/**
 * Remove item in form
 */
const onRemoveItem = (index: number) => {
  if (arrayItems.value.length === 1) return

  arrayItems.value.splice(index, 1)
}

/**
 * Check required
 */
const checkRequired = (item: any): boolean => {
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
      <v-card-text class="card-text">
        <v-form ref="refForm" v-model="isValid">
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
              <v-icon
                color="red"
                class="mt-2 cursor-pointer"
                @click="onRemoveItem(index)"
                :class="{ disabled: arrayItems.length === 1 }"
              >
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

.disabled {
  opacity: 0.5;
}
</style>
