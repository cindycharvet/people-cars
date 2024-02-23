import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const Records = () => (
    <Card title="Person Name"
    actions={[
        <EditOutlined key="edit" />,
        <DeleteOutlined style={{ color: 'red' }} key="delete" />,
        ]}>
      <Card
        type="inner"
        title="Year Maker Model -> Price"
        style={{
          marginBottom: 16,
        }}
        actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined style={{ color: 'red' }} key="delete" />,
            ]}>
      </Card>
      <Link>Learn More</Link>
    </Card>
  );

export default Records;