import { Tabs } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Add this import
import { theme } from "../../theme";

function TabBarIcon(props:{
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={22} style={{ color: props.color }} {...props} />;
}

const TabsLayout = () => {
    return(
        <SafeAreaView edges={['top']} style={style.safeArea}>
            <Tabs
             screenOptions={{
                tabBarActiveTintColor: theme.colors.ink,
                tabBarInactiveTintColor: theme.colors.muted,
                tabBarLabelStyle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
                tabBarStyle: {
                    borderTopLeftRadius: 26,
                    borderTopRightRadius: 26,
                    paddingTop: 8,
                    paddingBottom: 12,
                    marginHorizontal: 14,
                    marginBottom: 12,
                    backgroundColor: theme.colors.surfaceStrong,
                    borderColor: theme.colors.outline,
                    borderWidth: 1,
                    ...theme.shadow,
                },
                headerShown: false,
             }}>
                <Tabs.Screen name="index" 
                options={{
                    title: 'Shop',
                    tabBarIcon (props){
                        return <TabBarIcon {...props} name='gamepad' />;
                    }
                }} />
                <Tabs.Screen name="orders" options={{
                    title: 'Orders',
                    tabBarIcon (props){
                        return <TabBarIcon {...props} name='list-alt' />;
                    }
                }} />
            </Tabs>
        </SafeAreaView>
       
    );
};

export default TabsLayout;

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});
