export interface CartItem {
    book_id: string;
    quantity: number;
    book_name: string;
    book_author: string;
    book_price: string;
    book_description: string;
    cover_image: string;
  }
  
  export interface Purchase {
    purchase_id: number;
    description: string | null;
    phone_number: string;
    payment_method: string;
    address: string;
    purchase_datetime: string;
    cartItems: CartItem | CartItem[]; 
  }