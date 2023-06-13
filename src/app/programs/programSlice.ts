import { EntityState, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { Program } from "@/types";
import { RootState } from "../../store";
type ProgramsResponse = Program[]
type ResultType={
    entities:Program[],
    ids:String[]
}
const programsAdapter = createEntityAdapter<Program>({
  sortComparer: (a, b) => b.title.localeCompare(a.title),
});

const initialState = programsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<EntityState<Program>, void>({
      query: () => "/programs",
      transformResponse: (responseData:ProgramsResponse):EntityState<Program> => {
       
  
        const loadedPrograms = responseData.map((program:Program) => {
         
          return program;
        });
        return programsAdapter.setAll(initialState, loadedPrograms);
      },
      providesTags: (result:any) => {
        return [
          { type: "Program", id: "LIST" },
          ...result?.ids?.map((id:string) => ({ type: "Program", id })),
        ];
        
      },
    }),
    getProgramsByUserId: builder.query({
      query: (id) => `/programs/?userId=${id}`,
      transformResponse: (responseData:ProgramsResponse) => {
   
        const loadedPrograms = responseData.map((program) => {
        
          return program;
        });
        return programsAdapter.setAll(initialState, loadedPrograms);
      },
      providesTags: (result:any, error, arg) => [
        ...result?.ids?.map((id:string) => ({ type: "Program", id })),
      ],
    }),
    addNewProgram: builder.mutation({
      query: (initialPost) => ({
        url: "/programs",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
     
        },
      }),
      invalidatesTags: [{ type: "Program", id: "LIST" }],
    }),
    updateProgram: builder.mutation({
      query: (initialPost) => ({
        url: `/programs/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Program", id: arg.id }],
    }),
    deleteProgram: builder.mutation({
      query: ({ id }) => ({
        url: `/programs/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Program", id: arg.id }],
    }),

  }),
});

export const {
  useGetProgramsQuery,
  useGetProgramsByUserIdQuery,
  useAddNewProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,

} = extendedApiSlice;

// returns the query result object
export const selectProgramsResult = extendedApiSlice.endpoints.getPrograms.select();

// Creates memoized selector
const selectProgramsData = createSelector(
  selectProgramsResult,
  (programsResult) => programsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllPrograms,
  selectById: selectProgramById,
  selectIds: selectProgramIds,
} = programsAdapter.getSelectors(
  (state:RootState) => selectProgramsData(state) ?? initialState
);
