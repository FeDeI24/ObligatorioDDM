import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllTreatmentsData = ({ navigation }) => {
    const [treatments, setTreatments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("##### aaaaaaaaaaaaaaaa #####");
        getTreatments();
        getUsers();
    }, []);

    const getTreatments = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT matricula, nombre, fchFin, utReps, costo FROM treatments`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setTreatments(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay Tratamientos!!!",
                        [
                            {
                                text: "Ok",
                                onPress: () => navigation.navigate("Treatments"),
                            },
                        ],
                        { cancelable: false }
                    );
                }
            });
        });
    };

    const getUsers = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT u.nombre, u.matricula FROM users u, treatments t WHERE u.matricula = t.matricula`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setUsers(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay usuarios!!!",
                    );
                }
            });
        });
    };

    const listItemViewUser = (item) => {
        return (
            <View key={item.id} style={styles.listItemView}>
                <MyText text="Nombre de Usuario" style={styles.text} />
                <MyText text={item.nombre} style={styles.text} />

                <MyText text="Matricula de vehiculo" style={styles.text} />
                <MyText text={item.matricula} style={styles.text} />
            </View>
        );
    }

    const listItemViewTreatment = (item) => {
        return (
            <View key={item.id} style={styles.listItemView}>
                <MyText text="Matricula de Vehiculo" style={styles.text} />
                <MyText text={item.matricula} style={styles.text} />

                <MyText text="Nombre de Tratamiento" style={styles.text} />
                <MyText text={item.nombre} style={styles.text} />

                <MyText text="Fecha fin" style={styles.text} />
                <MyText text={item.fchFin} style={styles.text} />

                <MyText text="Utilizó repuestos" style={styles.text} />
                <MyText text={item.utReps} style={styles.text} />

                <MyText text="Costo del tratamiento" style={styles.text} />
                <MyText text={item.costo} style={styles.text} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={users}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => listItemViewUser(item)}
                    />
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={treatments}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => listItemViewTreatment(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewAllTreatmentsData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    generalView: {
        flex: 1,
    },
    listView: {
        marginTop: 20,
    },
    listItemView: {
        backgroundColor: "white",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
    }
});
