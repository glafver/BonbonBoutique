import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
    rating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const randomRating = Math.ceil(Math.random() * 5);
    const finalRating = rating || randomRating;

    return (
        <div className='d-flex' >
            {Array.from({ length: 5 }, (_, index) => (
                index < finalRating ? <FaStar key={index} className='rating-icon-filled rating-icon' /> : <FaStar key={index} className='rating-icon' />
            ))}
        </div>
    );
};

export default StarRating;