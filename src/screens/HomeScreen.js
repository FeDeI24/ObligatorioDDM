import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import MyButton from "../components/MyButton";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.generalView}>
                        <ScrollView>
                            <MyButton
                                title="Vehiculos"
                                btnColor="red"
                                btnIcon="user-circle"
                                customPress={() => navigation.navigate("Vehicles")}
                            />

                            <MyButton
                                title="Insumos"
                                btnColor="purple"
                                btnIcon="users"
                                customPress={() => navigation.navigate("Supplies")}
                            />

                            <MyButton
                                title="Repuestos"
                                btnColor="orange"
                                btnIcon="users"
                                customPress={() => navigation.navigate("Reps")}
                            />

                            <MyButton
                                title="Usuarios"
                                btnColor="green"
                                btnIcon="user-plus"
                                customPress={() => navigation.navigate("Users")}
                            />

                            <MyButton
                                title="Tratamientos"
                                btnColor="blue"
                                btnIcon="users"
                                customPress={() => navigation.navigate("Treatments")}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "grey",
    },
    generalView: {
        flex: 1,
        justifyContent: "center",
    },
});
