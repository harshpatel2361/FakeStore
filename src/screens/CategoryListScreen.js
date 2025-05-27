import React, { useEffect, useState } from 'react'
import { View, StatusBar, StyleSheet, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import { Header, LoaderScreen } from '../components'
import { color } from '../constants'

export const CategoryListScreen = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([]);

  const fetchCategoriesFromServer = async () => {
    setLoading(true);
    try {
      const options = {
        url: 'https://fakestoreapi.com/products/categories',
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await axios(options);
      if (response?.status == 200) {
        setCategories(response?.data);
      } else {
        console.log('Failed to fetch categories', response?.statusText)
      }
    } catch (error) {
      console.log("Error fetching categories from server:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderCategoriesList = (item) => {
    const data = item?.item
    return (
      <TouchableOpacity onPress={() => handleCategoryPress(data)} style={styles.listItem} activeOpacity={0.7} >
        <Text style={styles.listItemText}>{data}</Text>
      </TouchableOpacity>
    )
  }

  const handleCategoryPress = (item) => {
    navigation.navigate('productListScreen', { categoryName: item })
  }

  useEffect(() => {
    fetchCategoriesFromServer()
  }, []);

  if (loading) {
    return (
      <LoaderScreen />
    )
  }

  return (
    <View style={styles.mainView}>
      <StatusBar translucent={false} backgroundColor={color.secondary} barStyle='dark-content' />
      <Header title headerWithTitle headerTitle='Categories' />
      <View style={{ flex: 1 }}>
        {
          loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={[color.primary, color.secondary]} size='large' />
            </View>
          ) : (
            categories?.length > 0 ? (
              <FlatList contentContainerStyle={styles.flatList} data={categories} renderItem={renderCategoriesList} />
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
  flatList: {
    paddingVertical: 10,
    marginTop: 30,
    paddingHorizontal: 20,
    gap: 20
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    height: 50,
    backgroundColor: color.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.grey,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  listItemText: {
    fontSize: 20,
    color: color.textColor,
   fontFamily: 'mnstSemiBold',
    textTransform: 'uppercase'
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
  }
})