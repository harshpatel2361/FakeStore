import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { color } from '../constants'
import { Ionicons } from '@expo/vector-icons'

export const Button = ({ onPress, activeOpacity, btnLabel, showLeftcon, leftIcon, leftIconSize, leftIconColor, showRightIcon, rightIcon, rightIconColor, rightIconSize }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={activeOpacity || 0.6}>
      {showLeftcon && leftIcon()}
      <Text style={styles.buttonText}>{btnLabel}</Text>
      {showRightIcon && rightIcon()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    height: 55,
    borderRadius: 10,
    backgroundColor: color.primary,
  },
  buttonText: {
    color: color.white,
    fontSize: 20,
    letterSpacing: 1,
    textTransform: 'uppercase'
  }
})