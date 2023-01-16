import axios from 'axios';

export const postOrders = async () => {
  try {
    const result = await axios.post('/orders')
    return result
  } catch (error) {
    console.error(error)
  }
}
export const getUserOrderLIst = async () => {
  try {
    const result = await axios.get('/orders/customer')
    return result
  } catch (error) {
    console.error(error)
  }
}
export const getSellerOrderLIst = async () => {
  try {
    const result = await axios.get('/orders/seller')
    return result
  } catch (error) {
    console.error(error)
  }
}
export const patchOrderCancel= async () => {
  try {
    const result = await axios.patch(`orders/${id}/cancel`)
    return result
  } catch (error) {
    console.error(error)
  }
}
export const patchOrderConfirm= async () => {
  try {
    const result = await axios.patch(`orders/${id}/confirm`)
    return result
  } catch (error) {
    console.error(error)
  }
}