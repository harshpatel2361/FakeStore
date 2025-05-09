import { View, Text, StyleSheet, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { color } from '../constants';
import { Header, ProductCard } from '../components';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export const ProductListScreen = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  const fetchProductListBasedOnCategory = async (categoryName) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status == 200) {
        setProductList(response?.data);
      } else[
        console.log('Error fetching data', response?.statusText)
      ]
    } catch (error) {
      console.log("Error fetching products by category:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderProductItemList = (item) => {
    const data = item?.item;
    return (
      <ProductCard onPress={() => navigation.navigate('productDetailScreen', { id: data?.id })} productTitle={data?.title} imageURI={data?.image} productPrice={data?.price} />
    )
  }

  useEffect(() => {
    if (route?.params?.categoryName) {
      fetchProductListBasedOnCategory(route?.params?.categoryName);
    }
  }, []);

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={color.secondary} barStyle='light-content' />
      <Header title headerWithTitle headerTitle={route?.params?.categoryName} leftIcon headerLeftIcon={() => <Ionicons name='arrow-back-outline' size={30} color={color.primary} />} leftIconPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        {
          loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={[color.primary, color.secondary]} size='large' />
            </View>
          ) : (
            productList?.length > 0 ? (
              <FlatList contentContainerStyle={styles.flatList} data={productList} renderItem={renderProductItemList} />
            ) : (
              <View style={styles.emptyView}>
                <Text style={styles.emptyViewText}>There are no records to show</Text>
              </View>
            )
          )
        }
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
  flatList: {
    paddingTop: 10,
    marginTop: 30,
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 100
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})