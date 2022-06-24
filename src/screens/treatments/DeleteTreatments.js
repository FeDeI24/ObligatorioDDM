import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";
import MyDropDownPicker from "../../components/MyDropDownPicker";
const DropDownPicker = MyDropDownPicker;

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteTreatment = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [fchInicio, setFchInicio] = useState('');
  const [fchFin, setFchFin] = useState('');

  const deleteTreatment = ({ navigation }) => {
    console.log("deleteTreatment");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM treatments WHERE matricula = ?, fchInicio = ?, fchFin = ?`,
        [matricula, fchInicio, fchFin],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento eliminado");
            navigation.navigate("Treatments");
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
          <MyText text="Busqueda de tratamiento" style={styles.text}/>
            <KeyboardAvoidingView style={styles.keyboardView}>
              {/* Quisimos poner un DropDownPicker para mostrar todas las matriculas seleccionables pero no pudimos, pensamos arreglarlo para la proxima entrega */}
          <MyInputText
            placeholder="Matricula de Vehiculo"
            onChangeText={(text) => setMatricula(text)}
          />
          <MyInputText
            placeholder="Fecha Inicio"
            onChangeText={(text) => setFchInicio(text)}
          />
          <MyInputText
            placeholder="Fecha Fin"
            onChangeText={(text) => setFchFin(text)}
          />
          <MySingleButton title="Borrar Tratamiento" customPress={deleteTreatment} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteTreatment;

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
  inputStyle: {
    padding: 15,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
});
