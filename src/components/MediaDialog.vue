<template>
    <div v-if="visible" class="dialog-overlay" @click="handleClose">
        <div class="dialog media-dialog" @click.stop>
            <h3>{{ t('editor.dialogs.media.title') }}</h3>

            <!-- 视频表单 -->
            <div class="dialog-tab-content">
                <div class="dialog-form-group">
                    <label class="dialog-label">{{ t('editor.dialogs.media.urlLabel') }}</label>
                    <input v-model="formData.src" type="url" :placeholder="t('editor.dialogs.media.urlPlaceholder')" class="dialog-input" />
                    <span class="dialog-hint">{{ t('editor.dialogs.media.urlHint') }}</span>
                </div>
                <div class="dialog-form-group">
                    <label class="dialog-label">封面图片（可选）</label>
                    <input v-model="formData.poster" type="url" placeholder="请输入封面图片 URL" class="dialog-input" />
                    <span class="dialog-hint">视频播放前显示的封面图片</span>
                </div>
                <div class="dialog-form-group">
                    <label class="dialog-label">{{ t('editor.dialogs.media.widthLabel') }} / {{ t('editor.dialogs.media.heightLabel') }}</label>
                    <div class="dialog-row">
                        <div class="dialog-input-with-label">
                            <input v-model="formData.width" type="text" :placeholder="t('editor.dialogs.media.widthPlaceholder')" class="dialog-input" />
                            <span class="dialog-input-unit">px</span>
                        </div>
                        <span class="dialog-multiply">×</span>
                        <div class="dialog-input-with-label">
                            <input v-model="formData.height" type="text" :placeholder="t('editor.dialogs.media.heightPlaceholder')" class="dialog-input" />
                            <span class="dialog-input-unit">px</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dialog-actions">
                <button type="button" @click="handleClose" class="dialog-btn dialog-btn-cancel">{{ t('editor.dialogs.media.cancel') }}</button>
                <button type="button" @click="handleConfirm" class="dialog-btn dialog-btn-confirm">{{ t('editor.dialogs.media.confirm') }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IframeData } from '../composables'

interface Props {
    visible: boolean
    initialData?: IframeData
}

interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'confirm', data: IframeData): void
    (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
    initialData: () => ({
        src: '',
        title: '',
        width: '640',
        height: '360',
        embedCode: '',
        alternativeSrc: '',
        poster: '',
        allowFullscreen: true
    }),
})

// 使用全局 i18n
const { t } = useI18n()

const emit = defineEmits<Emits>()

const formData = reactive<IframeData>({
    src: '',
    title: '',
    width: '640',
    height: '360',
    embedCode: '',
    alternativeSrc: '',
    poster: '',
    allowFullscreen: true
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
        title: '',
        width: '640',
        height: '360',
        embedCode: '',
        alternativeSrc: '',
        poster: '',
        allowFullscreen: true
    })
}

const handleConfirm = () => {
    emit('confirm', { ...formData })
    handleClose()
}
</script>

<style lang="scss" scoped>
@use '../styles/dialogs.scss';
</style>
