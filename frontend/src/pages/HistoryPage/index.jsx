import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';

const HistoryPage = () => {
  const userData = useSelector(state => state.user?.userData);

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>주문목록</h2>
      </div>

      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='border-[1px]'>
          <tr>
            <th>상품명</th>
            <th>주문 ID</th>
            <th>가격</th>
            <th>개수</th>
            <th>주문시간</th>
          </tr>
        </thead>

        <tbody>
        {userData?.history?.map((item, index) => (
            <tr key={`${item.id}_${index}`} className='border-b'>
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default HistoryPage