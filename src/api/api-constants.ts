export enum ApiConstants {
    BASE_URL= "http://localhost:5000",
    AUTH_REGISTRATION = "/auth/registration",
    AUTH_LOGIN = "/auth/login",
    AUTH_REFRESH = "/auth/refresh",
    AUTH_GET_USER = "/auth/get-user",
    AUTH_CHANGE_PASSWORD = "/auth/change-password",
    AUTH_GET_ALL_USERS = "/auth/get-users",
    AUTH_MAKE_USER_ADMIN = "/auth/make-admin",
    PRODUCTS_GET_ALL = "/products/get",
    PRODUCTS_GET_YOURS = "/products/account-products",
    PRODUCTS_GET_BY_IDS = "/products/get-by-ids",
    PRODUCT_ADD = "/products/create",
    PRODUCT_EDIT = "/products/edit",
    PRODUCT_DELETE = "/products/delete",
    PRODUCT_BUY = "/products/buy",
    PRODUCT_BUY_CLIENT_SECRET = "/products/buy-product-client-secret",
    PUBLIC_ASSETS_URL = BASE_URL + "/public/",
    ADDRESSES_GET_ALL = "/addresses/get-addresses",
    ADDRESS_UPDATE = "/addresses/update",
    ADDRESS_CREATE = "/addresses/create",
    ADDRESS_DELETE = "/addresses/delete",
    CATEGORIES_GET_ALL = "/categories/",
    CATEGORY_CREATE = "/categories/create",
    CATEGORY_UPDATE = "/categories/update",
    CATEGORY_DELETE = "/categories/delete",
    COLORS_GET_ALL = "/colors/",
    COLOR_CREATE = "/colors/create",
    COLOR_UPDATE = "/colors/update",
    COLOR_DELETE = "/colors/delete",
    SIZES_GET_ALL = "/sizes/",
    SIZE_CREATE = "/sizes/create",
    SIZE_UPDATE = "/sizes/update",
    SIZE_DELETE = "/sizes/delete",
    FAVORITES_GET_ALL = "/favorite-products/",
    FAVORITE_ADD = "/favorite-products/add",
    FAVORITE_ADD_MANY = "/favorite-products/add-many",
    FAVORITE_REMOVE = "/favorite-products/remove",
    CART_ITEMS_GET_ALL = "/cart-items/",
    CART_ITEM_ADD = "/cart-items/add",
    CART_ITEM_ADD_MANY = "/cart-items/add-many",
    CART_ITEM_REMOVE = "/cart-items/remove",
    CART_ITEM_SET = "/cart-items/set-item"
}