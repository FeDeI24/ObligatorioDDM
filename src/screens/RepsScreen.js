import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const RepsScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='reps'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS reps', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS reps(rep_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), cantidad VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM reps', []);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Repuestos"
                btnColor="black"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterReps")}
              />

              <MyButton
                title="Actualizar Repuestos"
                btnColor="black"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateReps")}
              />

              <MyButton
                title="Ver Repuesto"
                btnColor="black"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewRep")}
              />

              <MyButton
                title="Borrar Repuesto"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteReps")}
              />

              <MyButton
                title="Ver todos los Repuestos"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllReps")}
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

export default RepsScreen;

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
