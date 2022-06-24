import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const TreatmentsScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='treatments'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS treatments', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS treatments(treatment_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), matricula VARCHAR(20), fchInicio VARCHAR(20), fchFin VARCHAR(20), costo VARCHAR(20), FOREIGN KEY(matricula) REFERENCES vehicles(matricula))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM treatments', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Tratamientos"
                btnColor="black"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterTreatments")}
              />

              <MyButton
                title="Actualizar Tratamientos"
                btnColor="black"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateTreatments")}
              />

              <MyButton
                title="Ver Tratamientos"
                btnColor="black"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewTreatment")}
              />

              <MyButton
                title="Borrar Tratamientos"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteTreatments")}
              />

              <MyButton
                title="Ver todos los Usuarios"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllTreatments")}
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

export default TreatmentsScreen;

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
