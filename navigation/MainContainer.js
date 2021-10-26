import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen';

// Name Screens
const homeName = 'Interactive Map';
const blogName = 'Blog';

const Tab = createBottomTabNavigator();
function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        sceenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (routeName === blogName) {
              iconName = focused ? 'blog' : 'blog-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 5, fontSize: 10 },
          style: { padding: 15, height: 80 },
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={blogName} component={BlogScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default MainContainer;
