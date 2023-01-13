import axios from 'axios';

export const getCartItems = async () => {
  try {
    const result = await axios.get('/carts')
    return result
  } catch (error) {
    console.error(error)
  }
}