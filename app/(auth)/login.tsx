import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/services/authService";

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const session = await loginUser(email, password);
      // console.log("Logged in: ", session)
      router.push("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} color="#6200ee" />
      </View>

      <View style={styles.secondaryButton}>
        <Button
          title="Don't have an account? Sign up"
          onPress={() => router.push("/signup")}
          color="#333"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  secondaryButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
