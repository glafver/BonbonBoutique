import React from 'react';
import { Product } from '../types/types';

interface ProductStickersProps {
    product: Product;
}

const ProductStickers: React.FC<ProductStickersProps> = ({ product }) => {
    return (
        <div style={{ position: 'absolute', left: '5px', top: '5px', display: 'flex', gap: '5px' }}>
            {product.on_sale ? <img width="40" height="40" src="https://img.icons8.com/parakeet/96/sale.png" alt="sale" /> : null}
            {product.tags.find(tag => tag.id === 124) ? <img width="40" height="40" src="https://img.icons8.com/parakeet/96/new.png" alt="new" /> : null}
        </div>
    );
};

export default ProductStickers;