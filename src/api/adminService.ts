import { authAxios } from './authAxios'

export const getAdminSellerList = async () => {
    const result = await authAxios.get(`/api/admins/seller`)
    return result.data
}
export const putAdminSellerList = async () => {
    const result = await authAxios.put(`/api/admins/seller`)
    return result.data
}