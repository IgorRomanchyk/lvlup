import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "pages/Auth/Auth";
import { BASE_URL } from "pages/Auth/Auth";
import IMap from "types/Map";
import IMaterial from "types/Material";

export const fetchData = createAsyncThunk(
  "getData/fetchData",
  async function(_, {rejectWithValue}) {
    const getMaps = await fetch(`${BASE_URL}/map/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const getMaterials = await fetch(`${BASE_URL}/map/scratch/materials`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await Promise.all([getMaps, getMaterials])
      .then((res) => Promise.all(res.map((r) => r.json())))
      .catch((error) => rejectWithValue(error.message))
    return res
  }
)

export const getMaterials = createAsyncThunk<IMaterial[], string>(
  "getData/getMaterials",
  async (map, {rejectWithValue}) => {
    const materials = await fetch(`${BASE_URL}/map/${map}/materials`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ("Server Error")
      }
      return res;
    })
    .then(res => res.json())
    .catch(error => rejectWithValue(error.message))
    return materials
  }
)

interface IState {
  error: boolean | any,
  loading: boolean,
  errorMaterial: boolean | any,
  loadingMaterial: boolean,
  maps: IMap[] | null,
  activeMap: IMap | null,
  materials: IMaterial[] | null,
  value: {
    value: string,
    copied: boolean,
  }
}
const initialState: IState = {
  error: false,
  loading: false,
  errorMaterial: false,
  loadingMaterial: false,
  maps: null,
  activeMap: null,
  materials: null,
  value: {
    value: "",
    copied: false,
  }
}


const dataSlice = createSlice({
  name: "getData",
  initialState,
  reducers: {
    setActiveMap(state, action) {
      state.activeMap = action.payload
    },
    setMaterial(state, action) {
      state.materials = action.payload
    },
    setCopied(state, action) {
      state.value.copied = action.payload
    },
    // onStartReject(state) {
    //   state.error = true
    //   state.loading = false
    // },
    // start(state,  { payload: { maps, materials } }) {
    //   state.error = false
    //   state.loading = false
    //   state.maps = maps
    //   state.activeMap = maps[0]
    //   state.materials = materials
    // },
    MouseOverToolkit(state: any, action) {
      state.materials[action.payload] = {...state.materials[action.payload],op: true}
      state.value.value = state.materials[action.payload].url
    },
    MouseLeaveToolkit(state: any, action) {
      state.materials[action.payload] = {...state.materials[action.payload],op: false}
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchData.fulfilled, (state, action: any) => {
      state.loading = false
      state.maps = action.payload[0]
      state.materials = action.payload[1]
      state.activeMap = action.payload[0][0]
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      console.log(action);
      
      state.loading = false
      state.error = true
    })

    builder.addCase(getMaterials.pending, (state) => {
      state.loadingMaterial = true
    }),
    builder.addCase(getMaterials.fulfilled, (state, action) => {
      state.loadingMaterial = false
      state.materials = action.payload
    }),
    builder.addCase(getMaterials.rejected, (state, action) => {      
      state.loadingMaterial = false
      state.errorMaterial = action.payload
    })
  }
    // [fetchData.pending]: (state) => {
    //   state.loading = true
    // },
    // [fetchData.fulfilled]: (state, action) => {
    //   state.loading = false
    //   state.maps = action.payload[0]
    //   state.materials = action.payload[1]
    //   state.activeMap = action.payload[0][0]

    // },
    // [fetchData.rejected]: (state, action) => {
    //   state.loading = false
    //   state.error = action.error.message
    // },

    // [getMaterials.pending]: (state) => {
    //   state.loadingMaterial = true
    // },
    // [getMaterials.fulfilled]: (state, action) => {
    //   // console.log(action)
    //   state.loadingMaterial = false
    //   state.materials = action.payload
    //   // state.maps = action.payload[0]
    //   // state.materials = action.payload[1]
    //   // state.activeMap = action.payload[0][0]
    // },
    // [getMaterials.rejected]: (state, action) => {
    //   state.loadingMaterial = false
    //   state.errorMaterial = action.error.message
    // },
  // }
})

    

  // }
// })

export const { setActiveMap, setMaterial, setCopied, MouseOverToolkit, MouseLeaveToolkit } = dataSlice.actions

export default dataSlice.reducer