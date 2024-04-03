import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface AuthForm {
  email: string;
  password: string;
}

///Creamos una interface para mandar mensajes de manera dinamica
interface ErrorSnackBar {
  visible: boolean;
  message: string;
}

export const LoginPage = () => {
  //accedemos al hook de navegacion
  const navigation = useNavigation();

  //empezamos a usar los useState
  const [authForm, setAuthForm] = useState<AuthForm>({
    email: "",
    password: "",
  });

   // hook useState para hacer mostrar u ocultar la contraseña
   const [hiddenPassword, setHiddenPassword] = useState(true);

  const [showError, setShowError] = useState<ErrorSnackBar>({
    visible: false,
    message: "",
  });

  //Método que setee valores
  const handlerSetValues = (key: string, value: string) => {
    setAuthForm({ ...authForm, [key]: value });
  };

  //Método para mandar a imprimir por consola
  const handlerAuth = async () => {
    //Validar que los datos existan...si no existen retirnamos y no nos deja pasar
    if (!authForm.email || !authForm.password) {
      setShowError({ visible: true, message: "Completa todos los campos" });
      return;
    }
    console.log(authForm);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        authForm.email,
        authForm.password
      );
      console.log(response);
    } catch (e) {
      console.log(e);
      setShowError({
        visible: true,
        message: "Usuario y/o contraseña incorrecta",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Inicia Sesión</Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Escribe tu correo"
        style={styles.inputs}
        onChangeText={(value) => handlerSetValues("email", value)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        secureTextEntry = {hiddenPassword}
        style={styles.inputs}
        onChangeText={(value) => handlerSetValues("password", value)}
        right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => handlerAuth()}
      >
        Iniciar
      </Button>
      <Snackbar
        visible={showError.visible}
        onDismiss={() => setShowError({ ...showError, visible: false })}
        style={{ backgroundColor: "#b53333" }}
      >
        {showError.message}
      </Snackbar>
      <Text
        style={styles.textRedirect}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Register" }))
        }
      >
        No tienes una cuenta? Regístrate ahora
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputs: {
    width: "90%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: "90%",
  },
  textRedirect: {
    marginTop: 20,
    fontSize: 16,
    color: "#5322af",
    fontWeight: "bold",
    textAlign: "center",
  },
});

//export default LoginPage;
