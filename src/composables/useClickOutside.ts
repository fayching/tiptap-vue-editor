import { onMounted, onBeforeUnmount } from 'vue'

interface UseClickOutsideOptions {
  onCloseDropdowns?: () => void
  onCloseDialogs?: () => void
}

export function useClickOutside(options: UseClickOutsideOptions = {}) {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    // 检查是否点击在下拉菜单或按钮内
    const isDropdown = target.closest('.dropdown, .dropdown-menu, .menu-button')
    if (!isDropdown && options.onCloseDropdowns) {
      options.onCloseDropdowns()
    }

    // 检查是否点击在对话框内
    const isDialog = target.closest('.el-dialog, .el-overlay')
    if (!isDialog && options.onCloseDialogs) {
      options.onCloseDialogs()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    handleClickOutside,
  }
}


