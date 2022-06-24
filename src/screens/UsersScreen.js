import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const UsersScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), apellido VARCHAR(20), ci VARCHAR(20), matricula VARCHAR(10), FOREIGN KEY(matricula) REFERENCES vehicles(matricula))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM users', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Usuarios"
                btnColor="black"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterUsers")}
              />

              <MyButton
                title="Actualizar Usuario"
                btnColor="black"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateUsers")}
              />

              <MyButton
                title="Ver Usuario"
                btnColor="black"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewUser")}
              />

              <MyButton
                title="Borrar Usuario"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteUsers")}
              />

              <MyButton
                title="Ver todos los Usuarios"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllUsers")}
              />
              <MyButton
                title="Borrar DB"
                btnColor="red"
                btnIcon="remove"
                customPress={() => removeElementsOnDatabase()}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UsersScreen;

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
