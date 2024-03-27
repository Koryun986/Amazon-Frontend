import {Card, Col, Row, Skeleton} from "antd";

const ProductsSkeleton = () => {
  const arr = new Array(4)
  return (
    <Row gutter={[16, 16]}>
      {arr.map((item, index) => (
        <Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} key={index}>
          <Card
            loading={true}
            cover={(
              <Skeleton.Image />
            )}
          >

          </Card>
        </Col>
      ))}
    </Row>
  )
};

export default ProductsSkeleton;