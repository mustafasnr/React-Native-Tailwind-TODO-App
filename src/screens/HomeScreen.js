import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import TodoComponent from "../components/TodoComponent";
import { useDispatch, useSelector } from "react-redux";
import { startAsync } from "../../store/todo";
import TodoInputComponent from "../components/TodoInputComponent";

const HomeScreen = () => {
  const { data, status, error } = useSelector(state => state.todoReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startAsync());
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Liste Değişti: ", data.length);
  }, [data]);
  return (
    <SafeAreaView className="flex flex-1 flex-col justify-start">
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <View className="absolute bottom-0 left-0 right-0 h-16">
        <TodoInputComponent />
      </View>
      <ScrollView className="absolute top-0 left-0 right-0 bottom-16 bg-white">
        <View className="flex flex-1 px-4 pt-2 flex-col justify-start items-center">
          {data.map(item => {
            return <TodoComponent key={item.id} item={item} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
