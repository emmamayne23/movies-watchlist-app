import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { getCurrentUser, logoutUser } from "@/services/authService";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user); 
        // console.log(user)
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null); 
      router.push("/"); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/logo.png')}
        style={styles.headerImage}
      />
      
      <View style={styles.content}>
        {user ? (
          <>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{ user.email || "User"}</Text>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.welcomeText}>Welcome to MovieWatch</Text>
            <Text style={styles.subtitle}>Track your favorite movies and shows</Text>
            
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => router.push("/signup")}
              >
                <Text style={styles.secondaryButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    color: '#f5c518',
    fontWeight: '600',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: '80%',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: '#f5c518',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#f5c518',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5c518',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#f5c518',
    fontSize: 16,
    fontWeight: 'bold',
  },
});