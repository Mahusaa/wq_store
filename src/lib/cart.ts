export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
}


const CART_STORAGE_KEY = "we-are-here-cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem(CART_STORAGE_KEY)
  return cart ? JSON.parse(cart) as CartItem[] : []
}

export function setCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.variantId === item.variantId
  );

  if (existingItemIndex > -1) {
    const existingItem = cart[existingItemIndex];
    if (existingItem) {
      existingItem.quantity += item.quantity;
    }
  } else {
    cart.push(item);
  }

  setCart(cart);
}


export function removeFromCart(variantId: string): void {
  const cart = getCart()
  const updatedCart = cart.filter((item) => item.variantId !== variantId)
  setCart(updatedCart)
}

export function updateCartItemQuantity(variantId: string, quantity: number): void {
  const cart = getCart()
  const updatedCart = cart.map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
  setCart(updatedCart)
}

export function clearCart(): void {
  setCart([])
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}


