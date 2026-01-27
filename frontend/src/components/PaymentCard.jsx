import React from 'react'
import Button from '../common/Button'

const PaymentCard = ({ cardHeading, CardPara, ButtonText, onClick, Price }) => {

    return (
        <>
            <div className='bg-gray-200 flex items-center justify-center flex-col p-4 space-y-4'>
                <h1 className='font-bold text-2xl'>{cardHeading}</h1>
                <h1>₹{Price}</h1>
                <p>{CardPara}</p>
                <Button
                    text={ButtonText}
                    type="button"
                    onClick={onClick}
                />
            </div>
        </>
    )
}

export default PaymentCard