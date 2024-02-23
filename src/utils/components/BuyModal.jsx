import React, { useState } from 'react'
import '../../styles/buymodal.css';
import Icon from './Icon';
export default function BuyModal({ item, closeModal }) {
    const [isConfirmed, setConfirmed] = useState(false);
    return (
        <div className='buymodal-cover'>
            <div className='buymodal'>
                <p> Confirm Purchase of {item.title} </p>

                <button
                    onClick={() => {
                        setConfirmed(true);
                        setTimeout(() => {
                            closeModal();
                        }, 1000);
                    }}
                    className='confirm-button'>
                    {isConfirmed ? <Icon icon={'check'} /> : <p> Confirm </p>}
                </button>
            </div>
        </div>
    );
}