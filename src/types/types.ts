export type TagType = {
    id: number;
    name: string;
    slug: string;
};

export interface Product {
    id: number;
    name: string;
    price: number;
    images: {
        thumbnail: string;
        large: string;
    };
    stock_status: string;
    stock_quantity: number;
    tags: TagType[];
}

export interface ExtandedProduct extends Product {
    description: string;
    on_sale: boolean;
}

export type CartItemType = {
    id: number;
    quantity: number;
    img: string;
    name: string;
    price: number;
};

export type OrderDataType = {
    customer_first_name: string;
    customer_last_name: string;
    customer_address: string;
    customer_postcode: string;
    customer_city: string;
    customer_email: string;
    customer_phone: string;
    order_items?: Array<{
        product_id: number;
        qty: number;
        item_price: number;
        item_total: number;
    }>;
    order_total?: number;
};