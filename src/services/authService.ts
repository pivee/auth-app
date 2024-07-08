import { apiClient } from "../libs/apiClient";

export const authenticate = () =>
  apiClient("/auth/", {
    method: "POST",
    credentials: "include",
  });

export const signUp = (name: string, email: string, password: string) =>
  apiClient("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const signIn = (email: string, password: string) =>
  apiClient("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({ username: email, password }),
  });

export const signOut = () =>
  apiClient("/auth/sign-out", {
    method: "POST",
  });
