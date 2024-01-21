import React from 'react';
import { Form } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { fetchTags } from '../api/api';
import { TagType } from '../types/types';
import { useProducts } from '../hooks/useProducts';

const ProductsFilter: React.FC = () => {
    const { data: tags } = useQuery<TagType[], Error>('tags', fetchTags);

    const { changeCategories, categories, changePriceRange, priceRange } = useProducts();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { checked } = event.target;
        changeCategories(id, checked);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && Number(value) >= 0)) {
            changePriceRange(name, value);
        }
    };

    return (
        <div>
            <p style={{ fontWeight: 'bolder' }}>Pris, kr</p>
            <div className="price-group">
                <Form.Control
                    name="from"
                    placeholder="From"
                    value={priceRange.from}
                    onChange={handlePriceChange}
                />
                <Form.Control
                    name="to"
                    placeholder="To"
                    value={priceRange.to}
                    onChange={handlePriceChange}
                />
            </div>

            <p style={{ fontWeight: 'bolder' }}>Kategori</p>
            <div className="checkbox-group">
                {tags && tags.map((tag) => (
                    <Form.Check
                        key={tag.id}
                        type="checkbox"
                        label={tag.name}
                        name={tag.name}
                        checked={categories[tag.id] || false}
                        onChange={(e) => handleCheckboxChange(e, tag.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsFilter;
