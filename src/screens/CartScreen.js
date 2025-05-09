import React from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Header, ProductCard } from '../components'
import { color } from '../constants'
import { decrementQuantity, incrementQuantity } from '../redux/slices/CartSlice'

export const CartScreen = () => {

  const { cartItems, totalQuantity, totalPrice } = useSelector(state => state?.cart);
  const dispatch = useDispatch();

  const renderCartItems = (item) => {
    const data = item?.item
    return (
      <ProductCard
        activeOpacity={1}
        productTitle={data?.title}
        imageURI={data?.image}
        productPrice={data?.price}
        showQuantityView
        productQuantity={data?.quantity}
        onIncrementPress={() => handleIncrementPress(data?.id)}
        onDecrementPress={() => handleDecrementPress(data?.id)}
      />
    )
  }

  const handleIncrementPress = (id) => {
    dispatch(incrementQuantity(id));
  }

  const handleDecrementPress = (id) => {
    dispatch(decrementQuantity(id));
  }

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={color.secondary} barStyle='light-content' />
      <Header title headerWithTitle headerTitle='Shopping Cart' />
      {
        cartItems?.length > 0 && (
          <View style={styles.topView}>
            <Text style={styles.bodyText}>Items: {totalQuantity}</Text>
            <Text style={styles.bodyText}>Total Price: $ {(totalPrice).toFixed(2)}</Text>
          </View>
        )
      }
      <View style={styles.productContainer}>
        {cartItems?.length > 0 ? (
          <FlatList contentContainerStyle={styles.scrollContainer} keyExtractor={item => item?.id} data={cartItems} renderItem={renderCartItems} />
        ) : (
          <View style={styles.emptyView}>
            <Text style={styles.emptyViewText}>Your cart is empty</Text>
          </View>
        )}
      </View>
      {cartItems?.length > 0 && (
        <View style={styles.bottomView}>
          <Button btnLabel='Checkout' />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  topView: {
    margin: 20,
    backgroundColor: color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20
  },
  bodyText: {
    color: color.white,
    fontSize: 20,
    fontWeight: '700'
  },
  productContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 20,
    flexGrow: 1
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyViewText: {
    color: color.primary,
    fontSize: 30,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.5
  },
  bottomView: {
    padding: 20
  }
})