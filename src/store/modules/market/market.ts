import { createApi } from "@reduxjs/toolkit/query/react";
import { myFetchFunction } from "../../myFetchFunction";
import { StockItem, StockDetail } from "../../../@types/stock";
import { Wish } from "../../../@types/wish";
import { createSlice } from "@reduxjs/toolkit";
import { IsoString } from "../../../@types/calendar";

interface MarketState {
  wish: {
    list: Wish[];
    offset: number;
    filterIndex: number;
  };
}

const initialState: MarketState = {
  wish: {
    list: [],
    offset: 0,
    filterIndex: 0,
  },
};

export const marketSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addWishListItem: (
      state,
      action: {
        payload: Wish;
      }
    ) => {
      state.wish.list.push(action.payload);
    },
    updateWishList: (
      state,
      action: {
        payload: {
          wishlist: Wish[];
        };
      }
    ) => {
      if (state.wish.offset === 0) state.wish.list = [];

      state.wish.list = [...state.wish.list, ...action.payload.wishlist];
    },
    setFilterIndex: (
      state,
      action: {
        payload: number;
      }
    ) => {
      if (state.wish.filterIndex === action.payload) return;

      state.wish.offset = 0;
      state.wish.filterIndex = action.payload;
      // 여기서 비우는게 아니라,
      // 새로 데이터가 받아올때, filterIndex가 바뀌었다면, offset을 0으로 초기화하고, list를 비워준다.
    },
    toggleWishLike: (
      state,
      action: {
        payload: number;
      }
    ) => {
      const index = state.wish.list.findIndex(
        (item) => item.wishlist_id === action.payload
      );
      state.wish.list[index].is_liked = !state.wish.list[index].is_liked;

      if (state.wish.list[index].is_liked) {
        state.wish.list[index].like_count += 1;
      } else {
        state.wish.list[index].like_count -= 1;
      }
    },
    increaseWishOffset: (state) => {
      state.wish.offset += 1;
    },
    resetWishList: (state) => {
      state.wish.list = [];
      state.wish.offset = 0;
      state.wish.filterIndex = 0;
    },
  },
});

export const {
  addWishListItem,
  updateWishList,
  toggleWishLike,
  increaseWishOffset,
  resetWishList,
  setFilterIndex,
} = marketSlice.actions;

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: myFetchFunction(""),
  tagTypes: ["StockList", "WishList"],
  endpoints: (builder) => ({
    getCategorizedStocks: builder.query<
      {
        myinterest: StockItem[];
        todaypopular: StockItem[];
        todayrecommend: StockItem[];
      },
      void
    >({
      query: () => {
        return {
          url: "/siuser/market",
        };
      },
    }),
    getAllStocks: builder.query<
      {
        stockitems: StockItem[];
      },
      void
    >({
      query: () => ({ url: "/siuser/all", method: "GET" }),
    }),
    getStockDetails: builder.query<
      StockDetail,
      {
        id: number;
      }
    >({
      query: ({ id }) => {
        return { url: `/siuser/detail/${id}`, method: "GET" };
      },
    }),
    getAllWishList: builder.query<
      {
        wishlist: Wish[];
      },
      {
        offset: number;
        limit: number;
        filter: "like" | "latest";
        timestamp: number;
      }
    >({
      query: ({ offset, limit, filter, timestamp }) => {
        return {
          url: `/wishlist?offset=${offset}&limit=${limit}&filter=${filter}&timestamp=${timestamp}`,
          method: "GET",
        };
      },
      providesTags: ["WishList"],
    }),
    getStockSuccessRate: builder.query<
      {
        sivalues: [
          {
            success_rate: number;
            date: IsoString;
          },
          {
            success_rate: number;
            date: IsoString;
          }
        ];
      },
      {
        stockitem_id: number;
      }
    >({
      query: ({ stockitem_id }) => {
        return {
          url: `/sivalue/month/${stockitem_id}`,
          method: "GET",
        };
      },
    }),
    addWishList: builder.mutation<
      {
        result: string;
      },
      {
        name: string;
      }
    >({
      query: ({ name }) => ({
        url: `/wishlist`,
        method: "POST",
        body: {
          name: name,
        },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(resetWishList());

          // 여기서 reset 하면서, offset이 0이 되니까, 다시 데이터를 받아오는데,
          // 그 다음에 또 invalidatesTags를 통해서, 다시 받아오게 된다.
          // 그래서 아마 데이터가 두번 받아오는 것 같다.
        } catch (error) {
          console.log("Error", error);
        }
      },
      invalidatesTags: ["WishList"],
    }),
    toggleLikeWishItem: builder.mutation<
      {
        result: string;
      },
      {
        wishlist_id: number;
      }
    >({
      query: ({ wishlist_id }) => ({
        url: `/wishlist/liketoggle`,
        method: "POST",
        body: {
          wishlist_id,
        },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(toggleWishLike(arg.wishlist_id));
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
  }),
});

export const {
  useGetCategorizedStocksQuery,
  useGetAllStocksQuery,
  useGetStockDetailsQuery,
  useAddWishListMutation,
  useToggleLikeWishItemMutation,
  useGetAllWishListQuery,
  useGetStockSuccessRateQuery,
} = marketApi;

export default marketSlice.reducer;