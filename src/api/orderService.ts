import { authAxios } from './authAxios';

export const postOrders = async (orderInfo : {  
  email: string;
  nickName: string;
  phoneNumber: string;
  address: string;
  request: string;
  orderItems : object;
  totalPrice : number;
}) => {
  try {
    const result = await authAxios.post('/api/orders', orderInfo)
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}

export const getUserOrderLIst = async () => {
  
  const result = await authAxios.get('/api/orders/customer')
  return result.data.content
}

export const getSellerOrderLIst = async () => {
  
  const result = await authAxios.get(`/api/orders/seller`)
  return result.data.content
}

export const patchOrderCancel= async (id : number) => {
    const result = await authAxios.patch(`/api/orders/${id}/cancel`)
    console.log(result)
    return result
}
export const patchOrderConfirm= async (id : number) => {
    const result = await authAxios.patch(`/api/orders/${id}/confirm`)
    console.log(result)
    return result
}