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

const RegisterUser = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [matricula, setMatricula] = useState('');

  const clearData = () => {
    setCi("");
    setApellido("");
    setNombre("");
    setMatricula("");
  };

  const registerUser = () => {
    console.log("states", nombre, apellido, ci, matricula);
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese su nombre de usuario");
      return;
    }
    if (!apellido.trim()) {
      Alert.alert("Ingrese su apellido");
      return;
    }
    if (!ci.trim()) {
      Alert.alert("Ingrese su cedula");
      return;
    }
    if (!matricula.trim()) {
      Alert.alert("Ingrese la matricula del vehiculo");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (nombre, apellido, ci, matricula) VALUES (?, ?, ?, ?)`,
        [nombre, apellido, ci, matricula],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Usuario registrado con éxito",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Users"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar usuario");
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
                placeholder="Nombre de Usuario"
                onChangeText={setNombre}
                style={styles.nameInput}
                value={nombre}
              />

              <MyInputText
                placeholder="Apellido de Usuario"
                onChangeText={setApellido}
                style={styles.apellidoInput}
                value={apellido}
              />

              <MyInputText
                placeholder="Cédula de Usuario"
                onChangeText={setCi}
                style={styles.ciInput}
                value={ci}
              />
              {/* Quisimos poner un DropDownPicker para mostrar todas las matriculas seleccionables pero no pudimos, pensamos arreglarlo para la proxima entrega */}
              <MyInputText
                placeholder="Matricula de vehiculo"
                onChangeText={setMatricula}
                style={styles.matriculaInput}
                value={matricula}
              />
              
              <MySingleButton
                title="Guardar Usuario"
                customPress={registerUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

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
  apellidoInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  matriculaInput: {
    padding: 15,
    textAlignVertical: "top",
  },
  ciInput: {
    padding: 15,
    textAlignVertical: "top",
  },
});