import { View, Text, TextInput, Pressable, Keyboard } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsync } from "../../store/todo";
import { getLastId } from "../utils/functions";
import Icon from "react-native-vector-icons/FontAwesome6";

const TodoInputComponent = () => {
  const { data } = useSelector(state => state.todoReducer);
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState("");

  const addTodoHandle = () => {
    if (todoText.length != 0) {
      const newTodo = { id: `todo_${getLastId(data) + 1}`, context: todoText };
      dispatch(addAsync(newTodo));
      setTodoText("");
      Keyboard.dismiss();
    }
  };
  return (
    <View className="w-full h-full bg-white">
      <View className="absolute top-[-1px] left-0 right-0 h-[1px] shadow-lg shadow-black"></View>
      <View className="w-full h-full flex px-3  flex-row justify-center items-center rounded-sm">
        <View className="flex flex-1 h-12 px-4">
          <View className="border-[2px] rounded-full border-[#818181] absolute flex justify-center items-center top-0 left-0 right-0 bottom-0">
            <Text
              className={
                "text-lg text-black/75 " +
                (todoText.length === 0 ? "" : "opacity-0")
              }>
              Yapılacak gir
            </Text>
          </View>
          <TextInput
            value={todoText}
            onChangeText={setTodoText}
            onPointerLeave={Keyboard.dismiss}
            className="text-lg text-center text-black"></TextInput>
        </View>

        <Pressable
          onPress={addTodoHandle}
          className={
            "ml-4 w-10 flex justify-center items-center h-10 rounded-full bg-black active:bg-black/60" +
            (todoText.length === 0 ? " hidden" : "")
          }>
          <Icon
            style={{
              width: 30,
              height: 30,
              fontSize: 25,
              color: "white",
              paddingTop: 1.5,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            name="plus"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TodoInputComponent;
