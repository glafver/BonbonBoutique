import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useFav } from '../../hooks/useFav';
import { useNavigate } from 'react-router-dom';
import { BsHeart } from "react-icons/bs";

const FavIcon: React.FC = () => {
    const navigate = useNavigate();
    const { fav } = useFav();

    const handleGoToFav = () => {
        navigate('/favorites');
    };

    return (
        <div className='position-relative' >
            <BsHeart onClick={handleGoToFav}
                className='icon-btn fav-icon'
            />
            {fav.length ? <Badge className='fav-badge'>{fav.length}</Badge> : null}
        </div>
    );
};

export default FavIcon;