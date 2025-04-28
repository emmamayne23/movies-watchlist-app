import { Client, ID, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

export const signupUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const user = await account.create(ID.unique(), email, password);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    throw new Error("Not logged in");
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    throw new Error(error);
  }
};
