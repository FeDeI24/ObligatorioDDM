import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const SuppliesScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='supplies'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS supplies', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS supplies(supply_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), cantidad VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM supplies', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de insumos"
                btnColor="black"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterSupplies")}
              />

              <MyButton
                title="Actualizar insumos"
                btnColor="black"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateSupplies")}
              />

              <MyButton
                title="Ver insumo"
                btnColor="black"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewSupply")}
              />

              <MyButton
                title="Borrar insumo"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteSupplies")}
              />

              <MyButton
                title="Ver todos los insumos"
                btnColor="black"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllSupplies")}
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

export default SuppliesScreen;

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
