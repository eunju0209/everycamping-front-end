import { authAxios } from './authAxios';

export const postOrders = async (orderInfo : {  
  name: string;
  phone: string;
  address: string;
  request: string;
  orderProductFormList : object[];
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
  // const result = await authAxios.get('/assets/data/order/userOrderList.json')
  return result.data.content
}
export const getUserOrderDetail = async (orderId : number) => {
  const result = await authAxios.get(`/api/orders/customer/${orderId}`)
  // const result = await authAxios.get(`/assets/data/order/userOrderDetail.json`)
  console.log(result.data)
  return result.data
}

export const getSellerOrderLIst = async () => {
  const result = await authAxios.get(`/api/orders/seller`)
  // const result = await authAxios.get(`/assets/data/order/sellerOrderList.json`)
  return result.data.content
}
export const getSellerOrderDetail = async (orderId : number) => {
  const result = await authAxios.get(`/api/orders/seller/${orderId}`)
  // const result = await authAxios.get(`/assets/data/order/sellerOrderDetail.json`)
  console.log(result.data)
  return result.data
}

export const patchOrderCancel = async (id : number) => {
    const result = await authAxios.patch(`/api/orders/${id}/cancel`)
    console.log(result)
    return result
}
export const patchOrderConfirm = async (id : number) => {
    const result = await authAxios.patch(`/api/orders/${id}/confirm`)
    console.log(result)
    return result
}