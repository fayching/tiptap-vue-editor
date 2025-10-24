<template>
    <div v-if="visible" class="dialog-overlay" @click="handleClose">
        <div class="dialog" @click.stop>
            <h3>{{ t('editor.dialogs.link.title') }}</h3>
            
            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.dialogs.link.hrefLabel') }} *</label>
                <input v-model="formData.href" type="url" :placeholder="t('editor.dialogs.link.hrefPlaceholder')" class="dialog-input" />
            </div>

            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.dialogs.link.textLabel') }}</label>
                <input v-model="formData.text" type="text" :placeholder="t('editor.dialogs.link.textPlaceholder')" class="dialog-input" />
                <span class="dialog-hint">{{ t('editor.dialogs.link.textHint') }}</span>
            </div>

            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.dialogs.link.targetLabel') }}</label>
                <select v-model="formData.target" class="dialog-select">
                    <option value="_self">{{ t('editor.dialogs.link.targetCurrent') }}</option>
                    <option value="_blank">{{ t('editor.dialogs.link.targetBlank') }}</option>
                </select>
                <span class="dialog-hint">{{ t('editor.dialogs.link.targetHint') }}</span>
            </div>

            <div class="dialog-actions">
                <button type="button" @click="handleClose" class="dialog-btn dialog-btn-cancel">{{ t('editor.dialogs.link.cancel') }}</button>
                <button type="button" @click="handleConfirm" class="dialog-btn dialog-btn-confirm">{{ t('editor.dialogs.link.confirm') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export interface LinkData {
    href: string
    text: string
    target: '_blank' | '_self'
}

interface Props {
    visible: boolean
    initialData?: Partial<LinkData>
}

interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'confirm', data: LinkData): void
    (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
    initialData: () => ({}),
})

// 使用全局 i18n
const { t } = useI18n()

const emit = defineEmits<Emits>()

const formData = reactive<LinkData>({
    href: '',
    text: '',
    target: '_blank'
})

watch(() => props.visible, (newVal) => {
    if (newVal && props.initialData) {
        formData.href = props.initialData.href || ''
        formData.text = props.initialData.text || ''
        formData.target = props.initialData.target || '_blank'
    }
})

const handleClose = () => {
    emit('update:visible', false)
    emit('close')
    Object.assign(formData, {
        href: '',
        text: '',
        target: '_blank'
    })
}

const handleConfirm = () => {
    if (!formData.href.trim()) return
    emit('confirm', { ...formData })
    handleClose()
}
</script>

<style lang="scss" scoped>
@use '../styles/dialogs.scss';
</style>

