import axios from 'axios'


export const getAdminSellerList = async () => {
  try {
    const result = await axios.get('/admin/seller')
    return result
  } catch (error) {
    console.error(error)
  }
}
export const putAdminSellerList = async () => {
  try {
    const result = await axios.put('/admin/seller')
    return result
  } catch (error) {
    console.error(error)
  }
}