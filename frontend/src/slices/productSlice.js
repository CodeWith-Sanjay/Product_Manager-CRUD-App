import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../services/api.js";

const initialState = {
    products: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const res = await api.get('/api/products/');
        return res.data.data
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData) => {
        const res = await api.post('/api/products/', productData);
        console.log('Response: ', res.data);
        return res.data.data
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({id, productData}) => {
        const res = await api.put(`/api/products/${id}`, productData);
        return res.data.data
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        const res = await api.delete(`/api/products/${id}`);
        return res.data.data
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        .addCase(addProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload)
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            
            const index = state.products.findIndex((product) => product._id === action.payload._id);

            if(index !== -1) {
                state.products[index] = action.payload;
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            
            state.products = state.products.filter(product => product._id !== action.payload._id)
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
});

// export const {fetchProducts, addProduct, updateProduct, deleteProduct} = productSlice.actions;
export default productSlice.reducer