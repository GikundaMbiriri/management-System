import { EntityState, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { Program } from "@/types";
import { RootState } from "../../store";
type ProgramsResponse = {
  count:number,
  programmes:Program[]
}

const programsAdapter = createEntityAdapter<Program>({
  selectId: (program: Program) => program._id,
  sortComparer: (a, b) => b.title.localeCompare(a.title)
});

const initialState = programsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<EntityState<Program>, string>({
      query: (url) => url,
      transformResponse: (responseData:ProgramsResponse):EntityState<Program> => {
       
  
        const loadedPrograms = responseData.programmes.map((program:Program) => {
          program.count=responseData.count;
         
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
  
  
    addNewProgram: builder.mutation({
      query: (initialPost) => ({
        url: "/programme/create",
        method: "POST",
        body: {
          ...initialPost,     
        },
      }),
      invalidatesTags: [{ type: "Program", id: "LIST" }],
    }),
    updateProgram: builder.mutation({
      query: (initialPost) => ({
        url: `/programme/edit/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Program", id: arg.id }],
    }),
    deleteProgram: builder.mutation({
      query: ({ id }) => ({
        url: `/programme/delete/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Program", id: arg.id }],
    }),

  }),
});

export const {
  useGetProgramsQuery,
 
  useAddNewProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,

} = extendedApiSlice;

// returns the query result object
export const selectProgramsResult = extendedApiSlice.endpoints.getPrograms.select("/programme/programmes?pageNum=1&pageSize=10");

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
