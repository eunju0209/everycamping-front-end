import { authAxios } from './authAxios'


export const getAdminSellerList = async () => {
    const result = await authAxios.get(`api/admins/seller`)
    console.log(result)
    return result.data
}
export const putAdminSellerList = async () => {
    const result = await authAxios.put(`api/admins/seller`)
    console.log(result)
    return result.data
}