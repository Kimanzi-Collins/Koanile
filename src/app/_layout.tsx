import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { CartProvider } from "../store/cart-store";
import { AuthProvider } from "../store/auth-store";
import { useAuth } from "../store/auth-store";

const AuthGate = ({ children }: { children: ReactNode }) => {
    const { session, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        const inAuthGroup = segments[0] === "auth";
        if (!session && !inAuthGroup) {
            router.replace("/auth/sign-in");
        } else if (session && inAuthGroup) {
            router.replace("/");
        }
    }, [loading, session, segments, router]);

    return <>{children}</>;
};

export default function RootLayout(){
    return (
        <CartProvider>
            <AuthProvider>
                <AuthGate>
                    <Stack>
                        <Stack.Screen 
                            name="(shop)" 
                            options={{ headerShown:false,title: "Koanile" }} 
                        />
                        <Stack.Screen 
                            name="categories" 
                            options={{ headerShown:false,title: "Categories" }} 
                        />
                        <Stack.Screen 
                            name="product" 
                            options={{ headerShown:false,title: "Products" }} 
                        />
                        <Stack.Screen 
                            name="cart" 
                            options={{ presentation:"modal" ,title: "Shopping Cart", headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="auth" 
                            options={{ headerShown:false}} 
                        /> 
                    </Stack>
                </AuthGate>
            </AuthProvider>
        </CartProvider>
    );
}
