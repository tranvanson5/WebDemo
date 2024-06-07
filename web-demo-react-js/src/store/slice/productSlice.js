import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [], // Danh sách các sản phẩm
    product: {} // Chi tiết sản phẩm, khởi tạo là một đối tượng rỗng
};

const productsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        listProducts: (state, action) => {
            state.products = action.payload; // Cập nhật danh sách sản phẩm từ action.payload
        },
        productDetail: (state, action) => {
            state.product = action.payload;
        }
    },
});

export const { listProducts, productDetail } = productsSlice.actions;
export default productsSlice.reducer;
