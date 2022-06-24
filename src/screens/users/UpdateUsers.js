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

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateUser = () => {
  const [ciSearch, setCiSearch] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [matricula, setMatricula] = useState('');

  const searchUser = () => {
    console.log("searchUser");

    if (!ciSearch.trim()) {
      Alert.alert("La cédula del Usuario es requerida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE ci = ?",
        [ciSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setApellido(results.rows.item(0).apellido);
            setCi(results.rows.item(0).ci);
            setMatricula(results.rows.item(0).matricula);
          } else {
            Alert.alert("Usuario no encontrado");
          }
        }
      );
    });
  };

  const updateUser = () => {
    console.log("updateUser");

    if (!nombre.trim()) {
        Alert.alert("El nombre del Usuario no puede estar vacio");
        return;
      }

      if (!apellido.trim()) {
        Alert.alert("El apellido del Usuario no puede estar vacio");
        return;
      }

    if (!ci.trim()) {
      Alert.alert("La cédula del Usuario no puede estar vacia");
      return;
    }

    if (!matricula.trim()) {
      Alert.alert("La matricula no puede estar vacia");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET nombre = ?, apellido = ?, ci = ?, matricula = ? WHERE ci = ?",
        [nombre, apellido, ci, matricula, ci],
        (tx, results) => {
          if (results.rows.length > 0) {
            Alert.alert("Usuario actualizado");
          } else {
            Alert.alert("No se pudo actualizar el usuario");
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
              <MyText text="Buscar Usuario" style={styles.text}/>
              <MyInputText
                placeholder="Ingrese la cedula del Usuario"
                style={styles.inputStyle}
                onChangeText={(text) => setCiSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchUser} />

              <MyInputText
                placeholder="Ingrese el nombre del Usuario"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />
              <MyInputText
                placeholder="Ingrese el apellido del Usuario"
                value={apellido}
                onChangeText={(text) => setApellido(text)}
              />
              <MyInputText
                placeholder="Ingrese la cedula del Usuario"
                value={ci}
                onChangeText={(text) => setCi(text)}
              />
              {/* Quisimos poner un DropDownPicker para mostrar todas las matriculas seleccionables pero no pudimos, pensamos arreglarlo para la proxima entrega */}
              <MyInputText
                placeholder="Ingrese la matricula"
                value={matricula}
                onChangeText={(text) => setMatricula(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

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
