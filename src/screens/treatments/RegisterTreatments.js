import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyDropDownPicker from "../../components/MyDropDownPicker";
const DropDownPicker = MyDropDownPicker;

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterTreatment = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [matricula, setMatricula] = useState('');
    const [fchInicio, setFchInicio] = useState('');
    const [fchFin, setFchFin] = useState('');
    const [costo, setCosto] = useState('');

    const clearData = () => {
        setMatricula("");
        setNombre("");
        setFchInicio("");
        setFchFin("");
        setCosto("");
    };

    const registerTreatment = () => {
        console.log("states", nombre, matricula, fchInicio, fchFin, costo);
        debugger;
        if (!nombre.trim()) {
            Alert.alert("Ingrese nombre del tratamiento");
            return;
        }
        if (!matricula.trim()) {
            Alert.alert("Ingrese matricula del vehiculo");
            return;
        }
        if (!fchInicio.trim()) {
            Alert.alert("Ingrese la Fecha de Inicio");
            return;
        }
        if (!fchFin.trim()) {
            Alert.alert("Ingrese la Fecha de Fin");
            return;
        }
        if (!costo.trim()) {
            Alert.alert("Ingrese el costo");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO treatments (nombre, matricula, fchInicio, fchFin, costo) VALUES (?, ?, ?, ?, ?)`,
                [nombre, matricula, fchInicio, fchFin, costo],
                (tx, results) => {
                    console.log("results", results);
                    if (results.rowsAffected > 0) {
                        clearData();
                        Alert.alert(
                            "Exito",
                            "Tratamiento registrado con éxito",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => navigation.navigate("Treatments"),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        Alert.alert("Error al registrar tratamiento");
                    }
                }
            );
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="Nombre de Tratamiento"
                                onChangeText={setNombre}
                                style={styles.nameInput}
                                value={nombre}
                            />
                            {/* Quisimos poner un DropDownPicker para mostrar todas las matriculas seleccionables pero no pudimos, pensamos arreglarlo para la proxima entrega */}
                            <MyInputText
                                placeholder="Matricula de Vehiculo"
                                onChangeText={setMatricula}
                                style={styles.matriculaInput}
                                value={matricula}
                            />
                            <MyInputText
                                placeholder="Fecha Inicio"
                                onChangeText={setFchInicio}
                                style={styles.fchInicioInput}
                                value={fchInicio}
                            />
                            <MyInputText
                                placeholder="Fecha Fin"
                                onChangeText={setFchFin}
                                style={styles.fchInicioInput}
                                value={fchFin}
                            />
                            <MyInputText
                                placeholder="Costo"
                                onChangeText={setCosto}
                                style={styles.fchInicioInput}
                                value={costo}
                            />

                            <MySingleButton
                                title="Guardar Tratamiento"
                                customPress={registerTreatment}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterTreatment;

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
    keyboardView: {
        flex: 1,
        justifyContent: "space-between",
    },
    nameInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    matriculaInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    matriculaInput: {
        padding: 15,
        textAlignVertical: "top",
    },
    fchInicioInput: {
        padding: 15,
        textAlignVertical: "top",
    },
});