import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { color } from '../constants'

export const ProductCard = ({
  onPress,
  activeOpacity,
  imageURI,
  productTitle,
  productPrice,
}) => {
  return (
    <TouchableOpacity style={styles.mainCard} onPress={onPress} activeOpacity={activeOpacity || 0.6}>
      <View style={styles.imageView}>
        <Image source={{uri: imageURI}} style={styles.image}/>
      </View>
      <View style={styles.productView}>
        <Text style={styles.productTitle} numberOfLines={2}>{productTitle}</Text>
        <Text style={styles.productPrice}>$ {productPrice}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainCard: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    gap: 10,
    overflow: 'hidden',
  },
  imageView: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productView: {
    flex: 1,
   flexDirection: 'column',
   justifyContent: 'space-between'
  },
  productTitle: {
    flex: 1, 
    fontSize: 22, 
    fontWeight: 'bold',
    color: color.black
  },
  productPrice: {
    fontSize: 20,
    color: color.grey,
    fontWeight: '500'
  }
})