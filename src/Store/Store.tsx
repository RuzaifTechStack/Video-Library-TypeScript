import { configureStore } from "@reduxjs/toolkit";
import VideoListSlice from "../Slicers/Video-slicer";

export default configureStore({
    reducer: {
        store : VideoListSlice
    }
})