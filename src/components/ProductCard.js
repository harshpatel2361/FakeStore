import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { color } from '../constants'
import { Ionicons } from '@expo/vector-icons'

export const ProductCard = ({
  onPress,
  activeOpacity,
  imageURI,
  productTitle,
  productPrice,
  productQuantity,
  showQuantityView,
  onIncrementPress,
  onDecrementPress
}) => {
  return (
    <TouchableOpacity style={styles.mainCard} onPress={onPress} activeOpacity={activeOpacity || 0.6}>
      <View style={styles.imageView}>
        <Image source={{ uri: imageURI }} style={styles.image} />
      </View>
      <View style={styles.productView}>
        <Text style={styles.productTitle} numberOfLines={2}>{productTitle}</Text>
        <Text style={styles.productPrice}>$ {productPrice}</Text>
        {
          showQuantityView && (
            <View style={styles.quantityView}>
              <TouchableOpacity style={styles.iconView} onPress={onDecrementPress}>
                <Ionicons name='remove-outline' size={30} color={color.primary} />
              </TouchableOpacity>
              <View style={styles.productQuantityView}>
                <Text style={styles.productQuantityText}>{productQuantity}</Text>
              </View>
              <TouchableOpacity style={styles.iconView} onPress={onIncrementPress}>
                <Ionicons name='add-outline' size={30} color={color.primary} />
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    gap: 10,
    overflow: 'hidden',
    backgroundColor: color.white
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
    resizeMode: 'contain',
    alignSelf: 'stretch',
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
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
    marginTop: 20
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.customBlack(0.2)
  },
  productQuantityView: {
    minWidth: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productQuantityText: {
    fontSize: 20,
    color: color.black,
    fontWeight: '900'
  }
})