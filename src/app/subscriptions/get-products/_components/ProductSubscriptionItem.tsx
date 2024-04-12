import {FC} from "react";
import {useRouter} from "next/navigation";
import type {IProduct} from "../../../../types/IProduct";
import Image from "next/image";
import {ApiConstants} from "../../../../api/api-constants";
import {Button, Card, message, Popconfirm} from "antd";
import {cancelSubscription} from "../../../../api/requests/subscription-requests";

interface ProductsSubscriptionItemProps {
  product: IProduct;
}

const ProductSubscriptionItem: FC<ProductsSubscriptionItemProps> = ({product}) => {
  const router = useRouter();

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(product.id);
      router.refresh();
      message.success("Subscription has been successfully canceled, changes will be applied after ~5min")
    } catch (e) {
      message.error("Oop something went wrong");
    }
  }

  return (
    <Card>
      <div className="flex justify-between">
        <div className="flex gap-4 w-[40%]">
          <Image
            src={ApiConstants.PUBLIC_ASSETS_URL+product?.main_image?.image_url}
            alt="Product Photo"
            width={0}
            height={0}
            unoptimized
            priority
            className="w-[60%] aspect-video object-contain"
          />
          <div>
            <div className="text-lg font-bold">{product.name}</div>
            <div>by {product.owner.first_name} {product.owner.last_name}</div>
            <div className={"text-md mt-5"}>Brand: <span className="font-semibold">{product.brand}</span></div>
          </div>
        </div>
        <div>
          <Popconfirm
            title="Cancel subscription"
            description="Are you sure to cancel this subscription?"
            onConfirm={handleCancelSubscription}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Cancel</Button>
          </Popconfirm>
        </div>
      </div>
    </Card>
  )
};

export default ProductSubscriptionItem;
