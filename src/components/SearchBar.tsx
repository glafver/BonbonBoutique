import React, { useState, ChangeEvent } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(query);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <Form style={{ position: 'relative' }}>
            <FormControl
                type="text"
                placeholder="Search"
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                style={{ paddingRight: '30px' }}
            />
            <span onClick={handleSearchClick} style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)'
            }}>
                <FaSearch />
            </span>
        </Form>
    );
};

export default SearchBar;
