import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating: React.FC = () => {
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        const randomRating = Math.ceil(Math.random() * 5);
        setRating(randomRating);
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            {Array.from({ length: 5 }, (_, index) => (
                index < rating ? <FaStar key={index} className='rating-icon-filled rating-icon' /> : <FaStar key={index} className='rating-icon' />
            ))}
        </div>
    );
};

export default StarRating;