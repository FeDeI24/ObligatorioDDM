import React, { useState, useEffect } from "react";
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
import MyText from "../../components/MyText";
import MyDropDownVehicles from "../../components/MyDropDownVehicles";
import MyDropDownSupplies from "../../components/MyDropDownSupplies";
import MyDropDownReps from "../../components/MyDropDownReps";
import MyDropDownUtReps from "../../components/MyDropDownUtReps";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterTreatment = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [fchInicio, setFchInicio] = useState('');
    const [fchFin, setFchFin] = useState('');
    const [costo, setCosto] = useState('');
    const [supplies, setSupplies] = useState([]);
    const [reps, setReps] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(undefined);
    const [selectedSupply, setSelectedSupply] = useState(undefined);
    const [selectedRep, setSelectedRep] = useState(undefined);
    const [selectedUtRep, setSelectedUtRep] = useState(undefined);

    const clearData = () => {
        setNombre("");
        setSelectedVehicle("");
        setFchInicio("");
        setFchFin("");
        setCosto("");
        setSelectedSupply("");
        setSelectedRep("");
        setSelectedUtRep("");
    };

    const utReps = [
        { label: '-----', value: '-----' },
        { label: 'SI', value: 'SI' },
        { label: 'NO', value: 'NO' }
    ];

    useEffect(() => {
        console.log("##### Buscar vehiculos, insumos, repuestos y tratamientos #####");
        getVehicles();
        getSupplies();
        getReps();
        getTreatments();
    }, []);

    const getVehicles = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT vehicle_id, matricula FROM vehicles`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setVehicles(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay vehiculos!!!",
                    );
                }
            });
        });
    };

    const getSupplies = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT supply_id, nombre FROM supplies`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setSupplies(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay insumos!!!",
                    );
                }
            });
        });
    };

    const getReps = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT rep_id, nombre FROM reps`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setReps(temp);
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay repuestos!!!",
                    );
                }
            });
        });
    };

    const getTreatments = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT insumo, repuesto FROM treatments`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setTreatments(temp);
                }
            });
        });
    };

    const registerTreatment = () => {
        console.log("states", nombre, selectedVehicle, fchInicio, fchFin, costo, selectedSupply, selectedRep, selectedUtRep);
        debugger;
        if (!nombre.trim()) {
            Alert.alert("Ingrese nombre del tratamiento");
            return;
        }
        if (nombre.length > 20) {
            Alert.alert("El nombre solo puede tener 20 caracteres");
            return;
        }
        if (!fchInicio.trim()) {
            Alert.alert("Ingrese la Fecha de Inicio");
            return;
        }
        if (fchInicio.length > 10) {
            Alert.alert("La fecha de inicio solo puede tener 10 caracteres");
            return;
        }
        if (!fchFin.trim()) {
            Alert.alert("Ingrese la Fecha de Fin");
            return;
        }
        if (fchFin.length > 10) {
            Alert.alert("La fecha de fin solo puede tener 10 caracteres");
            return;
        }
        if (!costo.trim()) {
            Alert.alert("Ingrese el costo");
            return;
        }
        if (costo.length > 20) {
            Alert.alert("El costo solo puede tener 20 caracteres");
            return;
        }

        for (let i in treatments) {
            if (treatments[i].insumo == selectedSupply || treatments[i].repuesto == selectedRep) {
                Alert.alert("El insumo o el repuesto ya estan asociados a un tratamiento");
                return true;
            }
        }
        if (selectedUtRep == "SI") {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO treatments (nombre, matricula, fchInicio, fchFin, costo, insumo, repuesto, utReps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [nombre, selectedVehicle, fchInicio, fchFin, costo, selectedSupply, selectedRep, selectedUtRep],
                    (tx, results) => {
                        console.log("results", results);
                        if (results.rowsAffected > 0) {
                            clearData();
                            getVehicles();
                            getSupplies();
                            getReps();
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
            return false;
        }
        else if (selectedUtRep == "NO") {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO treatments (nombre, matricula, fchInicio, fchFin, costo, insumo, repuesto, utReps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [nombre, selectedVehicle, fchInicio, fchFin, costo, selectedSupply, null, selectedUtRep],
                    (tx, results) => {
                        console.log("results", results);
                        if (results.rowsAffected > 0) {
                            clearData();
                            getVehicles();
                            getSupplies();
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
            return false;
        }
        else if (selectedUtRep == undefined) {
            Alert.alert("Seleccione si el tratamiento usa repuestos");
            return false;
        }
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
                            <MyDropDownVehicles
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={vehicles}
                                selected={setSelectedVehicle}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item }) => MyDropDownVehicles(item)}
                            />
                            <MyText text="Seleccionar matricula de Vehiculo" style={styles.text} />
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
                            <MyDropDownSupplies
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={supplies}
                                selected={setSelectedSupply}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item }) => MyDropDownSupplies(item)}
                            />
                            <MyText text="Seleccionar Insumos" style={styles.text} />
                            <MyDropDownUtReps
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={utReps}
                                selected={setSelectedUtRep}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item }) => MyDropDownUtReps(item)}
                            />
                            <MyText text="Seleccionar si el tratamiento usa o no repuestos" style={styles.text} />
                            <MyDropDownReps
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                data={reps}
                                selected={setSelectedRep}
                                keyExtractor={(index) => index.toString()}
                                renderItem={({ item }) => MyDropDownReps(item)}
                            />
                            <MyText text="Seleccionar Repuestos" style={styles.text} />

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
    text: {
        padding: 15,
        textAlign: "center",
    },
});