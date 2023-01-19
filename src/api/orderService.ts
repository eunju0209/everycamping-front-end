import { authAxios } from './authAxios';

export const postOrders = async (orderInfo : {  email: string;
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
  try {
    const result = await authAxios.get('/api/orders/customer')
    console.log(result.data.content)
    return result.data.content

  } catch (error) {
    console.error(error)
  }
}
export const getSellerOrderLIst = async () => {
  try {
    const result = await authAxios.get(`/api/orders/seller`)
    
    console.log(result.data.content)
    // return result.data.content.map((items) => {
    //   return {
    //     productId : items.productId ,
    //     img : items.imagePath,
    //     productName : items.productName,
    //     count : items.quantity,
    //     payPrice : items.amount,
    //     userName : items.customerNickName,
    //     phoneNumber : items.,
    //     address : items.,
    //     orderDate : items.createdAt,
    //   }
    // }
    return result.data.content

  } catch (error) {
    console.error(error)
  }
}
export const patchOrderCancel= async (id : number) => {
  try {
    const result = await authAxios.patch(`/api/orders/${id}/cancel`)
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}
export const patchOrderConfirm= async (id : number) => {
  try {
    const result = await authAxios.patch(`/api/orders/${id}/confirm`)
    console.log(result)
    return result
    
  } catch (error) {
    console.error(error)
  }
}