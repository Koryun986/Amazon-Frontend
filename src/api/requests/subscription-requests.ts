import api from "../index";
import {ApiConstants} from "../api-constants";

export async function subscribeProduct(productId: number) {
  return await api.post(ApiConstants.SUBSCRIBE_PRODUCT, {product_id: productId});
}

export async function getSubscriptionsOfProducts() {
  return await api.get(ApiConstants.SUBSCRIPTION_GET_PRODUCTS);
}

export async function cancelSubscription(productId: number) {
  return await api.delete(`${ApiConstants.SUBSCRIPTION_PRODUCT_CANCEL}/${productId}`);
}
