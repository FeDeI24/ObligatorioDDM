import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyDropDownPicker from "../../components/MyDropDownPicker";
const DropDownPicker = MyDropDownPicker;

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateTreatment = () => {
    const [matriculaSearch, setMatriculaSearch] = useState('');
    const [fchInicioSearch, setFchInicioSearch] = useState('');
    const [fchFinSearch, setFchFinSearch] = useState('');
    const [nombre, setNombre] = useState('');
    const [matricula, setMatricula] = useState('');
    const [fchInicio, setFchInicio] = useState('');
    const [fchFin, setFchFin] = useState('');
    const [costo, setCosto] = useState('');

    const searchTreatment = () => {
        console.log("searchTreatment");

        if (!matriculaSearch.trim()) {
            Alert.alert("La matricula del vehiculo es requerida");
            return;
        }
        if (!fchInicioSearch.trim()) {
            Alert.alert("La fecha de inicio es requerida");
            return;
        }
        if (!fchFinSearch.trim()) {
            Alert.alert("La fecha de fin es requerida");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM treatments WHERE matricula = ?, fchInicio = ?, fchFin = ?",
                [matriculaSearch, fchInicioSearch, fchFinSearch],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        setNombre(results.rows.item(0).nombre);
                        setMatricula(results.rows.item(0).matricula);
                        setFchInicio(results.rows.item(0).fchInicio);
                        setFchFin(results.rows.item(0).fchFin);
                        setCosto(results.rows.item(0).costo);
                    } else {
                        Alert.alert("Tratamiento no encontrado");
                    }
                }
            );
        });
    };

    const updateTreatment = () => {
        console.log("updateTreatment");

        if (!nombre.trim()) {
            Alert.alert("El nombre del Tratamiento no puede estar vacio");
            return;
        }
        if (!matricula.trim()) {
            Alert.alert("La matricula del Vehiculo no puede estar vacia");
            return;
        }
        if (!fchInicio.trim()) {
            Alert.alert("La Fecha de Inicio no puede estar vacia");
            return;
        }
        if (!fchFin.trim()) {
            Alert.alert("La Fecha de Fin no puede estar vacia");
            return;
        }
        if (!costo.trim()) {
            Alert.alert("El costo no puede estar vacio");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE treatments SET nombre = ?, matricula = ?, fchInicio = ?, fchFin = ?, costo = ? WHERE matricula = ?, fchInicio = ?, fchFin = ?",
                [nombre, matricula, fchInicio, fchFin, costo, matricula, fchInicio, fchFin],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        Alert.alert("Tratamiento actualizado");
                    } else {
                        Alert.alert("No se pudo actualizar el tratamiento");
                    }
                }
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={styles.keyboardView}
                        >
                            <MyText text="Buscar Tratamientos" style={styles.text} />
                            {/* Quisimos poner un DropDownPicker para mostrar todas las matriculas seleccionables pero no pudimos, pensamos arreglarlo para la proxima entrega */}
                            <MyInputText
                                placeholder="Ingrese la matricula del vehiculo"
                                style={styles.inputStyle}
                                onChangeText={(text) => setMatriculaSearch(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese la fecha de inicio"
                                style={styles.inputStyle}
                                onChangeText={(text) => setFchInicioSearch(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese la fecha de fin"
                                style={styles.inputStyle}
                                onChangeText={(text) => setFchFinSearch(text)}
                            />
                            <MySingleButton title="Buscar" customPress={searchTreatment} />

                            <MyInputText
                                placeholder="Ingrese el nombre del Tratamiento"
                                value={nombre}
                                onChangeText={(text) => setNombre(text)}
                            />
                            {/* Quisimos poner un DropDownPicker para mostrar todas las matriculas seleccionables pero no pudimos, pensamos arreglarlo para la proxima entrega */}
                            <MyInputText
                                placeholder="Ingrese la matricula del vehiculo"
                                value={matricula}
                                onChangeText={(text) => setMatricula(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese la fecha de inicio"
                                value={fchInicio}
                                onChangeText={(text) => setFchInicio(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese la fecha de fin"
                                value={fchFin}
                                onChangeText={(text) => setFchFin(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese el costo"
                                value={costo}
                                onChangeText={(text) => setCosto(text)}
                            />

                            <MySingleButton title="Actualizar" customPress={updateTreatment} />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateTreatment;

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
    text: {
        padding: 10,
        marginLeft: 25,
        color: "black",
    },
    inputStyle: {
        padding: 15,
    },
    keyboardView: {
        flex: 1,
        justifyContent: "space-between",
    },
});
