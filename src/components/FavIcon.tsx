import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useFav } from '../hooks/useFav';
import { useNavigate } from 'react-router-dom';
import { BsHeart } from "react-icons/bs";

const FavIcon: React.FC = () => {
    const navigate = useNavigate();
    const { fav } = useFav();

    const handleGoToFav = () => {
        navigate('/favorites');
    };

    return (
        <div style={{ position: 'relative' }} >
            <BsHeart onClick={handleGoToFav}
                id='fav-icon'
                className='icon-btn'
            />
            {fav.length ? <Badge id='fav-badge'>{fav.length}</Badge> : null}
        </div>
    );
};

export default FavIcon;