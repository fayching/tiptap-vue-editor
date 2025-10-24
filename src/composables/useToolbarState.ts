import { ref } from 'vue'

export function useToolbarState() {
  // 下拉菜单显示状态
  const showHeadingDropdown = ref(false)
  const showBulletListDropdown = ref(false)
  const showOrderedListDropdown = ref(false)
  const showTextAlignDropdown = ref(false)
  const showFontSizeDropdown = ref(false)
  const showColorDropdown = ref(false)
  const showTableDropdown = ref(false)

  // 表格子菜单状态
  const activeTableSubmenu = ref<string>('')
  const tableSize = ref({ rows: 3, cols: 3 })

  // 颜色选项
  const colorOptions = ref([
    '#000000', '#333333', '#666666', '#999999',
    '#ff0000', '#ff9900', '#ffff00', '#00ff00',
    '#00ffff', '#0099ff', '#0000ff', '#9900ff',
    '#ff00ff', '#ff0099', '#990000', '#009900',
  ])

  // 切换下拉菜单
  const toggleDropdown = (dropdown: string) => {
    // 关闭所有其他下拉菜单
    showHeadingDropdown.value = dropdown === 'heading' ? !showHeadingDropdown.value : false
    showBulletListDropdown.value = dropdown === 'bulletList' ? !showBulletListDropdown.value : false
    showOrderedListDropdown.value = dropdown === 'orderedList' ? !showOrderedListDropdown.value : false
    showTextAlignDropdown.value = dropdown === 'textAlign' ? !showTextAlignDropdown.value : false
    showFontSizeDropdown.value = dropdown === 'fontSize' ? !showFontSizeDropdown.value : false
    showColorDropdown.value = dropdown === 'color' ? !showColorDropdown.value : false
    showTableDropdown.value = dropdown === 'table' ? !showTableDropdown.value : false

    // 重置表格子菜单
    if (dropdown !== 'table') {
      activeTableSubmenu.value = ''
    }
  }

  // 关闭所有下拉菜单
  const closeAllDropdowns = () => {
    showHeadingDropdown.value = false
    showBulletListDropdown.value = false
    showOrderedListDropdown.value = false
    showTextAlignDropdown.value = false
    showFontSizeDropdown.value = false
    showColorDropdown.value = false
    showTableDropdown.value = false
    activeTableSubmenu.value = ''
  }

  return {
    showHeadingDropdown,
    showBulletListDropdown,
    showOrderedListDropdown,
    showTextAlignDropdown,
    showFontSizeDropdown,
    showColorDropdown,
    showTableDropdown,
    activeTableSubmenu,
    tableSize,
    colorOptions,
    toggleDropdown,
    closeAllDropdowns,
  }
}


