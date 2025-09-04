'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';

interface CartItem {
    packageId: string;
    quantity: number;
    addons?: Array<{ id: string; quantity: number }>;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (
        packageId: string,
        quantity: number,
        addons?: Array<{ id: string; quantity: number }>
    ) => void;
    removeFromCart: (packageId: string) => void;
    updateCartItem: (packageId: string, quantity: number) => void;
    updateCartItemAddons: (
        packageId: string,
        addons: Array<{ id: string; quantity: number }>
    ) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getItemCount: () => number;
    isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}

interface CartProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = 'helpi-cart';

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Initialize cart from localStorage after hydration
    useEffect(() => {
        // This effect only runs on the client side
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    setCartItems(parsed as CartItem[]);
                }
            }
        } catch (err) {
            console.error('Failed to parse cart:', err);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    // Persist to localStorage whenever cart items change (only after hydration)
    useEffect(() => {
        if (!isHydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
        } catch (err) {
            console.error('Failed to save cart:', err);
        }
    }, [cartItems, isHydrated]);

    const addToCart = useCallback(
        (
            packageId: string,
            quantity: number,
            addons?: Array<{ id: string; quantity: number }>
        ) => {
            setCartItems((prev) => {
                const idx = prev.findIndex((i) => i.packageId === packageId);
                if (idx >= 0) {
                    const next = [...prev];
                    const item = next[idx];
                    next[idx] = {
                        ...item,
                        quantity: item.quantity + quantity,
                        addons: addons ?? item.addons,
                    };
                    return next;
                }
                return [...prev, { packageId, quantity, addons }];
            });
        },
        []
    );

    const removeFromCart = useCallback((packageId: string) => {
        setCartItems((prev) => prev.filter((i) => i.packageId !== packageId));
    }, []);

    const updateCartItem = useCallback(
        (packageId: string, quantity: number) => {
            setCartItems((prev) =>
                prev.map((i) =>
                    i.packageId === packageId ? { ...i, quantity } : i
                )
            );
        },
        []
    );

    const updateCartItemAddons = useCallback(
        (
            packageId: string,
            addons: Array<{ id: string; quantity: number }>
        ) => {
            setCartItems((prev) =>
                prev.map((i) =>
                    i.packageId === packageId ? { ...i, addons } : i
                )
            );
        },
        []
    );

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const getCartTotal = useCallback(() => {
        // TODO: replace with real pricing logic
        return cartItems.reduce(
            (total, item) => total + item.quantity * 1000,
            0
        );
    }, [cartItems]);

    const getItemCount = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        updateCartItemAddons,
        clearCart,
        getCartTotal,
        getItemCount,
        isHydrated,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
