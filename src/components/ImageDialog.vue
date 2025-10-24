<template>
    <div v-if="visible" class="dialog-overlay" @click="handleClose">
        <div class="dialog image-dialog" @click.stop>
            <h3>{{ t('editor.dialogs.image.title') }}</h3>

            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.dialogs.image.urlLabel') }} *</label>
                <input v-model="formData.src" type="url" :placeholder="t('editor.dialogs.image.urlPlaceholder')" class="dialog-input" />
            </div>

            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.dialogs.image.altLabel') }}</label>
                <input v-model="formData.alt" type="text" :placeholder="t('editor.dialogs.image.altPlaceholder')" class="dialog-input" />
                <span class="dialog-hint">{{ t('editor.dialogs.image.altHint') }}</span>
            </div>

            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.dialogs.image.widthLabel') }} / {{ t('editor.dialogs.image.heightLabel') }}</label>
                <div class="dialog-row">
                    <div class="dialog-input-with-label">
                        <input v-model="formData.width" type="text" :placeholder="t('editor.dialogs.image.widthPlaceholder')" class="dialog-input" />
                        <span class="dialog-input-unit">px</span>
                    </div>
                    <span class="dialog-multiply">×</span>
                    <div class="dialog-input-with-label">
                        <input v-model="formData.height" type="text" :placeholder="t('editor.dialogs.image.heightPlaceholder')" class="dialog-input" />
                        <span class="dialog-input-unit">px</span>
                    </div>
                </div>
                <span class="dialog-hint">{{ t('editor.dialogs.image.widthHint') }}</span>
            </div>

            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.align.left') }}</label>
                <div class="image-align-options">
                    <button type="button" :class="['align-option', { active: formData.align === 'left' }]"
                        @click="formData.align = 'left'" :title="t('editor.align.left')">
                        <AlignLeft :size="18" />
                        <span>{{ t('editor.align.left') }}</span>
                    </button>
                    <button type="button" :class="['align-option', { active: formData.align === 'center' }]"
                        @click="formData.align = 'center'" :title="t('editor.align.center')">
                        <AlignCenter :size="18" />
                        <span>{{ t('editor.align.center') }}</span>
                    </button>
                    <button type="button" :class="['align-option', { active: formData.align === 'right' }]"
                        @click="formData.align = 'right'" :title="t('editor.align.right')">
                        <AlignRight :size="18" />
                        <span>{{ t('editor.align.right') }}</span>
                    </button>
                    <button type="button" :class="['align-option', { active: formData.align === '' }]"
                        @click="formData.align = ''" title="None">
                        <Minus :size="18" />
                        <span>None</span>
                    </button>
                </div>
            </div>

            <div class="dialog-actions">
                <button type="button" @click="handleClose" class="dialog-btn dialog-btn-cancel">{{ t('editor.dialogs.image.cancel') }}</button>
                <button type="button" @click="handleConfirm" class="dialog-btn dialog-btn-confirm">{{ t('editor.dialogs.image.confirm') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { AlignLeft, AlignCenter, AlignRight, Minus } from 'lucide-vue-next'
import type { ImageData } from '../composables'

interface Props {
    visible: boolean
    initialData?: ImageData
}

interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'confirm', data: ImageData): void
    (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
    initialData: () => ({
        src: '',
        alt: '',
        width: '',
        height: '',
        align: ''
    }),
})

// 使用全局 i18n
const { t } = useI18n()

const emit = defineEmits<Emits>()

const formData = reactive<ImageData>({
    src: '',
    alt: '',
    width: '',
    height: '',
    align: ''
})

watch(() => props.visible, (newVal) => {
    if (newVal && props.initialData) {
        Object.assign(formData, props.initialData)
    }
})

const handleClose = () => {
    emit('update:visible', false)
    emit('close')
    Object.assign(formData, {
        src: '',
        alt: '',
        width: '',
        height: '',
        align: ''
    })
}

const handleConfirm = () => {
    if (!formData.src.trim()) return
    emit('confirm', { ...formData })
    handleClose()
}
</script>

<style lang="scss" scoped>
@use '../styles/dialogs.scss';
</style>

