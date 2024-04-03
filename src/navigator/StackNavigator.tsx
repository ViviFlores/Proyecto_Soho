import { createStackNavigator } from "@react-navigation/stack";
import { LoginPage } from "../screens/LoginPage";
import { RegisterPage } from "../screens/RegisterPage";
import { HomePage } from "../screens/HomePage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

//interface para definir las propiedades de las rutas
interface Routes {
  name: string;
  screen: () => JSX.Element; // elemento jsx
}

const Stack = createStackNavigator();

// Función para cuando el usuario no está autenticado
const routesNoAuth: Routes[] = [
  { name: "Login", screen: LoginPage },
  { name: "Register", screen: RegisterPage },
];

//Función para cuando el usuario este autenticado
const routesAuth: Routes[] = [{ name: "Home", screen: HomePage }];

export const StackNavigator = () => {
  //hook para verificar si está logueado
  const [isAuth, setIsAuth] = useState(false);

  //hook para controlar la carga incial del screen
  const [isLoading, setIsLoading] = useState(false);

  //Hook usefect --validar cual es el estado de la autenticacion
  useEffect(() => {
    //cambiar estato del loading true
    setIsLoading(true);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // si existe un usuario está autenticado o no
        //seteamos el valor porque sabemos q existe el usuario
        setIsAuth(true);
        //console.log(user);
      }

      //cambiar de nuevo a false
      setIsLoading(false);
    });
  }, []); //si está vacío quiere decir que sólo se ejecutrá una vez
  return (
    <>
      {isLoading ? (
        <View style={styles.content}>
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <Stack.Navigator>
          {!isAuth
            ? routesNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))
            : routesAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))}
          {/* <Stack.Screen name="Register" options={{headerShown:false}} component={RegisterPage} /> */}
        </Stack.Navigator>
      )}
    </>
  );
};

const styles=StyleSheet.create({
    content:{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }
})