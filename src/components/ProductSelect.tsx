import Dropdown from 'react-bootstrap/Dropdown';
import { fetchTags } from '../api/api';
import { TagType } from '../types/types';
import { useQuery } from 'react-query';
import { useProducts } from '../hooks/useProducts';

const ProductSelect = () => {
    const { filterProducts, productTag, resetProductsFilter } = useProducts();

    const { data: tags } = useQuery<TagType[], Error>('tags', fetchTags);

    const handleSelect = (eventKey: string | null) => {
        if (eventKey && tags) {
            filterProducts(Number(eventKey), findNameById(tags, eventKey));
        } else {
            resetProductsFilter();
        }
    };

    const findNameById = (tags: TagType[], id: string) => {
        const tag = tags.find(tag => tag.id.toString() === id);
        return tag ? tag.name : "All products";
    };

    return (
        <>
            <Dropdown id="bk-navbar-select" onSelect={handleSelect}>
                <Dropdown.Toggle>{productTag ? productTag.name : "All products"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="">All products</Dropdown.Item>
                    {tags && tags.map((tag) => {
                        if (tag.id === 124) {
                            return (
                                <Dropdown.Item key={tag.id} eventKey={tag.id} style={{ color: 'deeppink', fontWeight: 'bold' }} >
                                    {tag.name}
                                </Dropdown.Item>
                            );
                        } else {
                            return (
                                <Dropdown.Item key={tag.id} eventKey={tag.id}>
                                    {tag.name}
                                </Dropdown.Item>
                            );
                        }
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );

};

export default ProductSelect;