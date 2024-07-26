import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

export const startAsync = createAsyncThunk("startAsync", async () => {
  const response = await firestore()
    .collection("DATA")
    .doc("TODOS")
    .collection("LIST")
    .get();
  return response;
});

export const addAsync = createAsyncThunk("addAsync", async todo => {
  const docRef = firestore()
    .collection("DATA")
    .doc("TODOS")
    .collection("LIST")
    .doc(todo.id);
  const addingTodo = { context: todo.context };
  await docRef.set(addingTodo);
  return todo;
});

export const editAsync = createAsyncThunk("editAsync", async todo => {
  const docRef = firestore()
    .collection("DATA")
    .doc("TODOS")
    .collection("LIST")
    .doc(todo.id);
  await docRef.set({ context: todo.context });
  return todo;
});

export const removeAsync = createAsyncThunk("removeAsync", async id => {
  const docRef = firestore()
    .collection("DATA")
    .doc("TODOS")
    .collection("LIST")
    .doc(id);
  await docRef.delete();
  return id;
});

const todo = createSlice({
  name: "todoList",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers: builder => {
    //loadTodoCases
    builder.addCase(startAsync.pending, (state, action) => {
      state.data = [];
      state.loading = true;
      state.error = "";
    });
    builder.addCase(startAsync.fulfilled, (state, action) => {
      list = [];
      action.payload.docs.forEach(doc => {
        list.push({ id: doc.id, context: doc.data().context });
      });
      state.data = list;
      state.loading = false;
    });
    builder.addCase(startAsync.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = "Yüklenirken bir hata meydana geldi";
    });

    //addTodoCases
    builder.addCase(addAsync.pending, (state, action) => {
      console.log("Veri Ekleniyor", state);
    });
    builder.addCase(addAsync.fulfilled, (state, action) => {
      console.log("Ekleniyor: ",action.payload)
      state.data = [...state.data, action.payload];
    });
    builder.addCase(addAsync.rejected, (state, action) => {
      state.error = "Ekleme Hatası: ";
    });

    //editTodoCases
    builder.addCase(editAsync.pending, (state, action) => {
      console.log("veri düzenleniyor");
    });
    builder.addCase(editAsync.fulfilled, (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      state.data[index].context = action.payload.context;
    });
    builder.addCase(editAsync.rejected, (state, action) => {
      state.error = "Editleme Hatası: "
    });

    //removeTodoCases
    builder.addCase(removeAsync.pending, (state, action) => {
      console.log("Veri Siliniyor");
    });
    builder.addCase(removeAsync.fulfilled, (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    });
    builder.addCase(removeAsync.rejected, (state, action) => {
      state.error = "Silme Hatası: "
    });
  },
});

export const { startData, addTodo, editTodo, removeTodo } = todo.actions;
export default todo.reducer;
/*

*/
