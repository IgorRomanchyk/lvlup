import { configureStore} from "@reduxjs/toolkit"
import dataSlice from "./Slice"

const store = configureStore({
  reducer: {
    data: dataSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store