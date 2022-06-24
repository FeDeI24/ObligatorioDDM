import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyDropDownPicker from "../../components/MyDropDownPicker";
const DropDownPicker = MyDropDownPicker;

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewTreatment = ({ navigation }) => {
    const [matricula, setMatricula] = useState("");
    const [fchInicio, setFchInicio] = useState("");
    const [fchFin, setFchFin] = useState("");
    const [treatmentData, setTreatmentData] = useState(null);

    const getTreatmentData = () => {
        console.log("getTreatmentData");
        setTreatmentData({});

        if (!matricula.trim()) {
            Alert.alert("La matricula del vehiculo es requerida");
            return;
        }
        if (!fchInicio.trim()) {
            Alert.alert("La fecha de inicio es requerida");
            return;
        }
        if (!fchFin.trim()) {
            Alert.alert("La fecha de fin es requerida");
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM treatments WHERE matricula = ?, fchInicio = ?, fchFin = ?`,
                [matricula, fchInicio, fchFin],
                (tx, results) => {
                    console.log("results", results);
                    if (results.rows.length > 0) {
                        setTreatmentData(results.rows.item(0));
                    } else {
                        Alert.alert("El tratamiento no existe");
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
                            <MyText text="Filtro de tratamientos" style={styles.text} />
                            {/* Quisimos poner un DropDownPicker para mostrar todas las matriculas seleccionables pero no pudimos, pensamos arreglarlo para la proxima entrega */}
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="Matricula de vehiculo"
                                onChangeText={(text) => setMatricula(text)}
                            />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="Fecha inicio"
                                onChangeText={(text) => setFchInicio(text)}
                            />
                            <MyInputText
                                style={styles.inputStyle}
                                placeholder="Fecha fin"
                                onChangeText={(text) => setFchFin(text)}
                            />
                            <MySingleButton title="Buscar" customPress={getTreatmentData} />

                            <View style={styles.presenterView}>
                                <MyText text={`Nombre: ${!treatmentData ? '' : treatmentData.nombre}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Matricula: ${!treatmentData ? '' : treatmentData.matricula}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Fecha Inicio: ${!treatmentData ? '' : treatmentData.fchInicio}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Fecha Fin: ${!treatmentData ? '' : treatmentData.fchFin}`} style={styles.presenterText} />
                            </View>
                            <View style={styles.presenterView}>
                                <MyText text={`Costo: ${!treatmentData ? '' : treatmentData.costo}`} style={styles.presenterText} />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewTreatment;

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
        margin: 10,
        color: "black",
    },
    presenterView: {
        flex: 2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30,
    },
    presenterText: {
        fontSize: 20
    }
});
