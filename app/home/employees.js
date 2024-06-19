import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import SearchResults from "../../components/SearchResults";

const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);
  console.log(employees);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          marginTop: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Pressable onPress={goBack}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#f0f0f0",
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <AntDesign name="search1" size={20} color="black" />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{
              flex: 1,
              height: 40,
              marginLeft: 10,
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
            placeholder="Search"
            placeholderTextColor="#808080"
          />
        </View>

        {employees.length > 0 && (
          <Pressable
            onPress={() => router.push("/home/addetails")}
            style={{ marginLeft: 8 }}
          >
            <AntDesign name="pluscircleo" size={24} color="blue" />
          </Pressable>
        )}
      </View>

      {employees.length > 0 ? (
        <SearchResults data={employees} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text> No Data</Text>
          <Text> Press on the plus button and add your Employee</Text>
          <Pressable onPress={() => router.push("/home/addetails")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircleo"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default employees;

const styles = StyleSheet.create({});
