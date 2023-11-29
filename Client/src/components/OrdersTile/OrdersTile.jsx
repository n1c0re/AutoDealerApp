import React, { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'

function OrdersTile({ order }) {
	const {
		zakaz_id,
		seller_name,
		zakaz_date,
		zakaz_status,
		car_id,
		car_name,
		car_price,
		currency,
	} = order
	const { loggedInUser } = useContext(AuthContext)

	async function handleDeleteOrder() {
		console.log(zakaz_id)
		try {
			await axios.delete(`http://localhost:4000/api/orders/`, {
				params: { orderId: zakaz_id },
			})
		} catch (error) {
			console.error('Error:', error)
		}
	}

	async function handleSubmitOrder() {
		console.log(loggedInUser.seller_id, zakaz_id)
		try {
			await axios.post(`http://localhost:4000/api/orders/submit`, {
				sellerId: loggedInUser.seller_id,
				orderId: zakaz_id,
			})
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div key={zakaz_id} className='order-tile'>
			<p>{seller_name}</p>
			<p>{zakaz_date}</p>
			<p>{zakaz_status}</p>
			<p>{car_id}</p>
			<p>{car_name}</p>
			<p>
				{car_price} {currency}
			</p>
			{zakaz_status == 'В обработке' ? (
				<>
					<button onClick={handleSubmitOrder}>Подтвердить заказ</button>
					<button onClick={handleDeleteOrder}>Отменить заказ</button>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default OrdersTile
