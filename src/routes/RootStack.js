import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import UsersScreen from "../screens/UsersScreen";
import VehiclesScreen from "../screens/VehiclesScreen";
import TreatmentsScreen from "../screens/TreatmentsScreen";

import RegisterUser from "../screens/users/RegisterUsers";
import UpdateUser from "../screens/users/UpdateUsers";
import ViewAllUsers from "../screens/users/ViewAllUsers";
import ViewUser from "../screens/users/ViewUser";
import DeleteUser from "../screens/users/DeleteUsers";

import RegisterVehicle from "../screens/vehicle/RegisterVehicles";
import UpdateVehicle from "../screens/vehicle/UpdateVehicles";
import ViewAllVehicles from "../screens/vehicle/ViewAllVehicles";
import ViewVehicle from "../screens/vehicle/ViewVehicle";
import DeleteVehicle from "../screens/vehicle/DeleteVehicles";

import RegisterTreatment from "../screens/treatments/RegisterTreatments";
import UpdateTreatment from "../screens/treatments/UpdateTreatments";
import ViewAllTreatments from "../screens/treatments/ViewAllTreatments";
import ViewTreatment from "../screens/treatments/ViewTreatment";
import DeleteTreatment from "../screens/treatments/DeleteTreatments";

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: "Car Treatment Center",
                        headerStyle: {
                            backgroundColor: "#000000",
                        },
                        headerTintColor: "#b2b2b2",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="Users"
                    component={UsersScreen}
                    options={{
                        title: "Usuarios",
                        headerStyle: {
                            backgroundColor: "#000000",
                        },
                        headerTintColor: "#b2b2b2",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="Vehicles"
                    component={VehiclesScreen}
                    options={{
                        title: "Vehiculos",
                        headerStyle: {
                            backgroundColor: "#000000",
                        },
                        headerTintColor: "#b2b2b2",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="Treatments"
                    component={TreatmentsScreen}
                    options={{
                        title: "Tratamientos",
                        headerStyle: {
                            backgroundColor: "#000000",
                        },
                        headerTintColor: "#b2b2b2",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="RegisterUsers"
                    component={RegisterUser}
                    options={{
                        title: "Registrar Usuarios",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="UpdateUsers"
                    component={UpdateUser}
                    options={{
                        title: "Modificar Usuarios",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewAllUsers"
                    component={ViewAllUsers}
                    options={{
                        title: "Ver todos los Usuarios",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewUser"
                    component={ViewUser}
                    options={{
                        title: "Ver Usuario",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="DeleteUsers"
                    component={DeleteUser}
                    options={{
                        title: "Borrar Usuarios",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="RegisterVehicles"
                    component={RegisterVehicle}
                    options={{
                        title: "Registrar Vehiculos",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="UpdateVehicles"
                    component={UpdateVehicle}
                    options={{
                        title: "Modificar Vehiculos",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewAllVehicles"
                    component={ViewAllVehicles}
                    options={{
                        title: "Ver todos los Usuarios",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewVehicle"
                    component={ViewVehicle}
                    options={{
                        title: "Ver Vehiculo",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="DeleteVehicles"
                    component={DeleteVehicle}
                    options={{
                        title: "Borrar Vehiculos",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="RegisterTreatments"
                    component={RegisterTreatment}
                    options={{
                        title: "Registrar Tratamientos",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="UpdateTreatments"
                    component={UpdateTreatment}
                    options={{
                        title: "Modificar Tratamientos",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewAllTreatments"
                    component={ViewAllTreatments}
                    options={{
                        title: "Ver todos los Tratamientos",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />

                <Stack.Screen
                    name="ViewTreatment"
                    component={ViewTreatment}
                    options={{
                        title: "Ver Tratamiento",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                
                <Stack.Screen
                    name="DeleteTreatments"
                    component={DeleteTreatment}
                    options={{
                        title: "Borrar Tratamientos",
                        headerStyle: {
                            backgroundColor: "#a2a29f",
                        },
                        headerTintColor: "#000000",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;

