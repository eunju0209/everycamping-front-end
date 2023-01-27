export const userTypeConvert = (type : string) => {
  switch (type) {
    case 'user':
      return 'CUSTOMER';
      break;
    case 'seller':
      return 'SELLER';
      break;
    case 'admin':
      return 'ADMIN';
      break;
    default :
      return ''
  }
}
