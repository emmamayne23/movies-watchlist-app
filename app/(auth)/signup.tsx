import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, Alert } from "react-native";
import { signupUser } from "@/services/authService";
import { useRouter } from "expo-router";

const SignupScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const user = await signupUser(email, password);
    //   console.log("Signup success: ", user);
      router.push("/");
    } catch (error: any) {
      console.error("Signup error", error);
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SignUp</Text>
      
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
        <Button 
          title="Sign Up" 
          onPress={handleSignup} 
          color="#6200ee"
        />
      </View>
      
      <View style={styles.secondaryButton}>
        <Button
          title="Already have an account? Login"
          onPress={() => router.push("/login")}
          color="#333"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      padding: 20,
      backgroundColor: '#f8f9fa', // Light gray background
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: { 
      borderWidth: 1, 
      borderColor: '#ddd', // Lighter border
      padding: 15, 
      marginVertical: 10,
      borderRadius: 8, // Rounded corners
      backgroundColor: 'white', // White input background
      fontSize: 16,
    },
    button: {
      marginTop: 20,
      borderRadius: 8, // Match input rounding
      overflow: 'hidden', // Ensures Button respects borderRadius
    },
    secondaryButton: {
      marginTop: 10,
    },
  });

export default SignupScreen;