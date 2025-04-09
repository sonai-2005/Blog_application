import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status:false,
    userdata:null,
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{//state used for local in the file handeling and action for the input from another file
            state.status = true;
            state.userdata = action.payload.userdata;
        },
        logout:(state,action)=>{
            state.status = false;
            userdata = null;
        }

    }
})
export const{login,logout} = authSlice.actions; 
export default authSlice.reducer;