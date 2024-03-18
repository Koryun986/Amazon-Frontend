export enum ApiConstants {
    BASE_URL= "http://localhost:5000",
    AUTH_REGISTRATION = "/auth/registration",
    AUTH_LOGIN = "/auth/login",
    AUTH_REFRESH = "/auth/refresh",
    AUTH_GET_USER = "/auth/get-user",
    PRODUCTS_GET_ALL = "/products",
    PUBLIC_ASSETS_URL = BASE_URL + "/public/",
    ADDRESSES_GET_ALL = "/addresses/get-addresses",
    ADDRESS_UPDATE = "/addresses/update",
    ADDRESS_CREATE = "/addresses/create",
    ADDRESS_DELETE = "/addresses/delete",
    CATEGORIES_GET_ALL = "/categories/",
    CATEGORY_CREATE = "/categories/create",
    CATEGORY_UPDATE = "/categories/update",
    CATEGORY_DELETE = "/categories/delete"
}