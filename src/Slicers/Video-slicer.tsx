import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    MyVideoLibrary : [],
    videoCount  : 0
}
 const VideoListSlice = createSlice({
    name: 'MyLibrary',
    initialState,
    reducers: {
        AddToLibrary(state:any, action:any){
            state.MyVideoLibrary.push(action.payload);
            state.videoCount = state.MyVideoLibrary.length;
        }
    }
 })

 export const {AddToLibrary} = VideoListSlice.actions;
 export default VideoListSlice.reducer;