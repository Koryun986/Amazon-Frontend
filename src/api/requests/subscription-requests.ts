import api from "../index";
import {ApiConstants} from "../api-constants";

export async function subscribeProduct(productId: number) {
  return await api.post(ApiConstants.SUBSCRIBE_PRODUCT, {product_id: productId});
}
