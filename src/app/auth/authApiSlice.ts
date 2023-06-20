import { apiSlice } from "../../api/apiSlice";
import { User } from "@/types";
type UserResponse = {
    sessionId:string,
    user:User,
    valid:boolean
  }
  type CredentialsType={
    email:string,
    password:string
  }

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials:CredentialsType) => ({
        url: "/auth/login",
        method: "POST",
        credentials: "include",
        body: { ...credentials },
      }),
      transformResponse: (responseData:UserResponse):User => {
       
  
        const loggedinUser = responseData.user;
        return loggedinUser;
      },
    }),
    refreshToken: builder.query<any,any>({
      query: () => ({
        url: "/auth/refreshSession",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (responseData:UserResponse):User => {
        console.log(responseData)
        const loggedinUser = responseData.user;
        return loggedinUser;
      },
    }),
  }),
});


export const {
    useLoginMutation,
    useRefreshTokenQuery
}=authApiSlice