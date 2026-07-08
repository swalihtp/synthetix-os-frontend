import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMobileSidebarOpen: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMobileSidebar: state => {
      state.isMobileSidebarOpen = true
    },
    closeMobileSidebar: state => {
      state.isMobileSidebarOpen = false
    },
    toggleMobileSidebar: state => {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen
    }
  }
})

export const {
  openMobileSidebar,
  closeMobileSidebar,
  toggleMobileSidebar
} = uiSlice.actions

export const selectMobileSidebarOpen = state => state.ui.isMobileSidebarOpen

export default uiSlice.reducer
