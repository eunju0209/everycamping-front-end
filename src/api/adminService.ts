import { authAxios } from './authAxios'

export const getAdminSellerList = async () => {
    const result = await authAxios.get(`/api/admins/seller`)
    return result.data.content
}
export const putAdminSellerList = async ( id : number) => {
    const result = await authAxios.put(`/api/admins/seller`, 
        JSON.stringify([id])
    )
}