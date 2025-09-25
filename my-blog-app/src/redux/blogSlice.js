const { createSlice } = require("@reduxjs/toolkit");

const blogSlice = createSlice({
     name:"blog",
     initialState:{
        loading:false,
        blog:[],
        userBlog:[]
     },
     reducers:{
        //actions
        setLoading:(state,action) => {
            state.loading = action.payload;
        },
        setBlog:(state,action) => {
            state.blog = action.payload;
        },
        setUserBlog:(state,action) => {
            state.userBlog = action.payload
        }

     } 
})

export const {setLoading,setBlog,setUserBlog} = blogSlice.actions;
export default blogSlice.reducer; 