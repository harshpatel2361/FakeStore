import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CartScreen, CategoryListScreen } from '../screens'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../constants'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

export const BottomStackNavigation = () => {
    const {  totalQuantity } = useSelector(state => state?.cart);
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
            height: 70,
            
        },
        tabBarActiveBackgroundColor: color.secondary,
        tabBarLabelStyle: {
            fontWeight: '800',
            fontSize: 20,
            color: color.primary
        }
    }}>
        <Tab.Screen name='categoryListScreen' component={CategoryListScreen} options={{
            tabBarIcon: props => (<Ionicons name='home' size={30} color={color.primary}  />),
            tabBarLabel: 'Products',
            tabBarLabelStyle: {
                fontWeight: '800',
                fontSize: 20,
                color: color.black
            }
        }} />
        <Tab.Screen name='cartScreen' component={CartScreen} options={{
            tabBarIcon: props => (<Ionicons name='cart-outline' size={30} color={color.primary} />),
            tabBarLabel: 'Shopping Cart',
            tabBarBadge: totalQuantity,
            tabBarBadgeStyle: {
                backgroundColor: color.error
            }
        }} />
    </Tab.Navigator>
  )
}
