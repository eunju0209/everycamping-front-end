export const userTypeConvert = (type : string) => {
  switch (type) {
    case 'user':
      return 'CUSTOMER';
   
    case 'seller':
      return 'SELLER';
      
    case 'admin':
      return 'ADMIN';
      
    default :
      return 'CUSTOMER'
  }
}
