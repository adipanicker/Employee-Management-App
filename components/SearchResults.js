import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const SearchResults = ({ data, input, setInput }) => {
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#4b6cb7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                  >
                    {item?.employeeName?.charAt(0)}
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}
                  >
                    {item?.employeeName}
                  </Text>
                  <Text style={{ fontSize: 16, color: "#666", marginTop: 5 }}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
