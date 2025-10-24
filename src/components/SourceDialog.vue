<template>
    <div v-if="visible" class="dialog-overlay" @click="handleClose">
        <div class="dialog dialog-large" @click.stop>
            <h3>{{ t('editor.dialogs.source.title') }}</h3>
            
            <div class="dialog-form-group">
                <label class="dialog-label">{{ t('editor.dialogs.source.label') }}</label>
                <textarea 
                    v-model="htmlContent" 
                    class="dialog-textarea source-editor"
                    :placeholder="t('editor.dialogs.source.placeholder')"
                    rows="15"
                    spellcheck="false"
                />
                <span class="dialog-hint">{{ t('editor.dialogs.source.hint') }}</span>
            </div>

            <div class="dialog-actions">
                <button type="button" @click="handleClose" class="dialog-btn dialog-btn-cancel">
                    {{ t('editor.dialogs.source.cancel') }}
                </button>
                <button type="button" @click="handleConfirm" class="dialog-btn dialog-btn-confirm">
                    {{ t('editor.dialogs.source.confirm') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
    visible: boolean
    initialHtml?: string
}

interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'confirm', html: string): void
    (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
    initialHtml: '',
})

const { t } = useI18n()
const emit = defineEmits<Emits>()

const htmlContent = ref('')

watch(() => props.visible, (newVal) => {
    if (newVal) {
        htmlContent.value = props.initialHtml || ''
    }
})

const handleClose = () => {
    emit('update:visible', false)
    emit('close')
    htmlContent.value = ''
}

const handleConfirm = () => {
    emit('confirm', htmlContent.value)
    handleClose()
}
</script>

<style lang="scss" scoped>
@use '../styles/dialogs.scss';

.dialog-large {
    max-width: 800px;
    width: 90%;
}

.source-editor {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 13px;
    line-height: 1.5;
    resize: vertical;
    min-height: 200px;
    max-height: 500px;
}

.dialog-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s;
    
    &:focus {
        outline: none;
        border-color: #409eff;
    }
}
</style>

