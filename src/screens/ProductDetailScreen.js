import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { color } from '../constants'
import { Button, Header } from '../components'
import axios from 'axios'

export const ProductDetailScreen = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const fetchProductDetailsById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response.status == 200) {
        setProductDetails(response?.data);
      } else {
        console.log('Error fetching product details', response.statusText);
      }
    } catch (error) {
      console.log("Error fetching product details::", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (route?.params?.id) {
      fetchProductDetailsById(route?.params?.id)
    }
  }, [])

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={color.secondary} barStyle='light-content' />
      <Header title headerWithTitle headerTitle='Product Details' leftIcon headerLeftIcon={() => <Ionicons name='arrow-back-outline' size={30} color={color.primary} />} leftIconPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={[color.primary, color.secondary]} size='large' />
          </View>
        ) : (
          productDetails && (
            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={styles.productDetailsWrapper}>
                <View style={styles.imageView}>
                  <Image source={{ uri: productDetails?.image }} style={styles.image} />
                </View>
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{productDetails?.title}</Text>
                </View>
                <View style={styles.productRatingsAndPrice}>
                  <View style={styles.productRatings}>
                    <Ionicons name='star' size={30} color={color.secondary} />
                    <Text style={styles.bodyText}>{productDetails?.rating?.rate} (Sold: {productDetails?.rating?.count})</Text>
                  </View>
                  <Text style={styles.priceText}>$ {productDetails?.price}</Text>
                </View>
                <View style={styles.productDescription}>
                  <Text style={styles.descriptionText}>{productDetails?.description}</Text>
                </View>
              </ScrollView>
              <View style={styles.bottomView}>
                <Button showLeftcon leftIcon={() => (<Ionicons name='cart' size={30} color={color.white} />)} btnLabel='add to cart' />
              </View>
            </View>
          )
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.white
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewText: {
    fontSize: 30,
    color: color.primary,
    fontWeight: '900'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailsWrapper: {
    paddingTop: 10,
    paddingBottom: 120,
    marginHorizontal: 10,
  },
  imageView: {
    width: '100%',
    height: 450,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: color.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  productDetails: {
    marginTop: 10,
    padding: 10
  },
  productTitle: {
    fontSize: 28,
    color: color.primary,
    fontWeight: 'bold',
  },
  productRatingsAndPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  productRatings: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bodyText: {
    fontSize: 20,
    color: color.grey,
    fontWeight: '600'
  },
  priceText: {
    fontSize: 24,
    color: color.grey,
    fontWeight: '800'
  },
  descriptionText: {
    fontSize: 22,
    color: color.grey,
    fontWeight: '400'
  },
  productDescription: {
    marginHorizontal: 10,
    marginTop: 20
  },
  bottomView: {
    backgroundColor: color.secondary,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%'
  }
})
