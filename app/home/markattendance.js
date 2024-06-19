import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const MarkAttendance = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [employeeWithAttendance, setEmployeeWithAttendance] = useState([]);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  useEffect(() => {
    // Fetch employee data
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/employees");
        const employees = response.data;
        setEmployeeWithAttendance(
          employees.map((employee) => ({
            ...employee,
            status: null, // Initialize status to null
          }))
        );
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={goToPrevDay}
          name="left"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.headerText}>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextDay}
          name="right"
          size={24}
          color="black"
          style={styles.icon}
        />
      </View>

      <View style={styles.employeeList}>
        {employeeWithAttendance.map((item, index) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/home/${item.employeeId}`,
                params: {
                  name: item.employeeName,
                  id: item.employeeId,
                  salary: item?.salary || "", // Use ternary operator
                  designation: item?.designation || "", // Use ternary operator
                },
              })
            }
            key={index}
            style={styles.employeeItem}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item?.employeeName?.charAt(0)}
              </Text>
            </View>
            <View style={styles.employeeDetails}>
              <Text style={styles.employeeName}>{item?.employeeName}</Text>
              <Text style={styles.designation}>
                {item?.designation
                  ? `${item?.designation} (${item?.employeeId})`
                  : "Unknown designation"}
              </Text>
            </View>
            {item?.status && (
              <View style={styles.status}>
                <Text style={styles.statusText}>{item.status.charAt(0)}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  icon: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  employeeList: {
    marginHorizontal: 12,
  },
  employeeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4b6cb7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
  },
  employeeDetails: {
    flex: 1,
    marginLeft: 10,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  designation: {
    marginTop: 5,
    color: "gray",
  },
  status: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF69B4",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default MarkAttendance;
