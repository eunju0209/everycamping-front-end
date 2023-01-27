import { useEffect, useState } from 'react';
import ReviewList from '../../components/Review/ReviewList';
import { useUserInfo } from '../../store/UserInfoProvider';

export default function UserReviewList() {
  const { userInfo } = useUserInfo();
  const [customerId, setCustomerId] = useState(0);

  useEffect(() => {
    userInfo.customerId ? setCustomerId(userInfo.customerId) : setCustomerId(0);
  }, [userInfo]);

  return <>{customerId && <ReviewList customerId={customerId} />}</>;
}
