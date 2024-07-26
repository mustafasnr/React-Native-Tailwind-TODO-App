import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  Vibration,
} from "react-native";

import { useDispatch } from "react-redux";
import { editAsync, removeAsync } from "../../store/todo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TodoComponent = ({ item }) => {
  const dispatch = useDispatch();
  const [newText, setNewText] = useState(item.context);
  const [editing, setEditing] = useState(false);
  const [done, setDone] = useState(false);
  const toggleDone = () => {
    setDone(!done);
  };
  const toggleEdit = () => {
    setEditing(!editing);
  };

  const editHandle = newText => {
    if (newText.length != 0) {
      const newTodo = { id: item.id, context: newText };
      dispatch(editAsync(newTodo));
      toggleEdit();
    }
  };
  const cancelEdit = () => {
    setNewText(item.context);
    toggleEdit();
  };
  const removeHandle = () => {
    dispatch(removeAsync(item.id));
  };
  return (
    <Pressable
      onLongPress={() => {
        toggleEdit();
        Vibration.vibrate(75);
      }}
      onPress={() => {
        console.log("tıklandı");
        toggleDone();
      }}
      delayLongPress={500}
      className={
        "w-[95%] p-2 mb-2 rounded-md shadow-md shadow-black/75  bg-white" +
        (editing ? " scale-110" : "")
      }>
      {!editing ? (
        <View className="w-full max-h-full flex flex-row justify-start gap-x-2 items-center">
          <View className="flex py-2 flex-1 flex-row justify-start items-center">
            <Text
              className={"text-black text-xl pl-2 " + (done ? " line-through" : "")}>
              {item.context}
            </Text>
          </View>

          <View className="w-7 h-7">
            <Icon
              onPress={toggleEdit}
              style={{
                width: 25,
                fontSize: 25,
                height: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
              name="square-edit-outline"
            />
          </View>
          <View className="w-7 h-7">
            <Icon
              onPress={removeHandle}
              style={{
                width: 25,
                fontSize: 25,
                height: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
              name="delete"
            />
          </View>
        </View>
      ) : (
        <View className="w-full max-h-full flex flex-row justify-start gap-x-2 items-center">
          <View className="flex flex-1 px-4 ">
            <View className="bg-white absolute flex justify-center items-center top-0 left-0 right-0 bottom-0">
              <Text
                className={
                  "text-lg text-black/50 " +
                  (newText.length === 0 ? "" : "opacity-0")
                }>
                Düzenle
              </Text>
            </View>
            <TextInput
              value={newText}
              autoFocus={true}
              onChangeText={setNewText}
              onPointerLeave={Keyboard.dismiss}
              className="text-lg text-center border-b-[1px] border-black/30 text-black"></TextInput>
          </View>

          <View className="w-7 h-7 ">
            <Icon
              onPress={() => {
                Keyboard.dismiss();
                editHandle(newText);
              }}
              style={{
                width: 25,
                fontSize: 25,
                height: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
              name="checkbox-marked"
            />
          </View>
          <View className="w-7 h-7">
            <Icon
              onPress={() => {
                cancelEdit();
              }}
              style={{
                width: 25,
                fontSize: 25,
                height: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
              name="cancel"
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default TodoComponent;
