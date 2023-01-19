import { EVERY_CAMPIING_URL } from '../constant/URL'
import { authAxios } from './authAxios'



export const getAdminSellerList = async () => {
  try {
    const result = await authAxios.get(`${EVERY_CAMPIING_URL}/admin/seller`)
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}
export const putAdminSellerList = async () => {
  try {
    const result = await authAxios.put(`${EVERY_CAMPIING_URL}/admin/seller`)
    console.log(result)
    return result
    
  } catch (error) {
    console.error(error)
  }
}