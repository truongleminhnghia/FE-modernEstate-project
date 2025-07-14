import React from 'react';
import { Form, Select, Slider, Button, Row, Col } from 'antd';
import { ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { RotateCcw } from 'lucide-react';

const { Option } = Select;

const projectTypes = [
  { value: 'all', label: 'Tất cả loại hình' },
  { value: 'Chung_Cư', label: 'Chung cư' },
  { value: 'Nhà_Biệt_Thự', label: 'Biệt thự' },
  { value: 'Nhà_Villa', label: 'Villa' },
  { value: 'Nhà_Ở', label: 'Nhà ở' },
  { value: 'Đất_Nền', label: 'Đất nền' }
];

const projectStatuses = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'Đang_Mở_Bán', label: 'Đang mở bán' },
  { value: 'Sắp_Mở_Bán', label: 'Sắp mở bán' },
  { value: 'Đang_Xây_Dựng', label: 'Đang xây dựng' }
];

const formatPrice = (price) => {
  if (price >= 1000000000) {
    return `${(price / 1000000000).toFixed(1)} tỷ`;
  } else if (price >= 1000000) {
    return `${(price / 1000000).toFixed(0)} triệu`;
  }
  return `${price.toLocaleString()}`;
};

const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'Đang_Bàn_Giao', label: 'Đang bàn giao' },
  { value: 'Đang_Giao_Dịch', label: 'Đang giao dịch' },
  { value: 'Đang_Xây_Dựng', label: 'Đang xây dựng' },
  { value: 'Đang_Mở_Bán', label: 'Đang mở bán' },
  { value: 'Hoàn_Tất_Giấy_Phép', label: 'Hoàn tất giấy phép' },
  { value: 'Sắp_Mở_Bán', label: 'Sắp mở bán' }
];

const typeOptions = [
  { value: 'all', label: 'Tất cả loại hình' },
  { value: 'Nhà_Đất', label: 'Nhà đất' },
  { value: 'Chung_Cư', label: 'Chung cư' },
  { value: 'Đất_Nền', label: 'Đất nền' },
  { value: 'Nhà_Ở', label: 'Nhà ở' },
  { value: 'Nhà_Mặt_Phố', label: 'Nhà mặt phố' },
  { value: 'Nhà_Tập_Thể', label: 'Nhà tập thể' },
  { value: 'Nhà_Villa', label: 'Villa' },
  { value: 'Nhà_Biệt_Thự', label: 'Biệt thự' },
  { value: 'Nhà_Cấp_4', label: 'Nhà cấp 4' },
  { value: 'Nhà_Cấp_3', label: 'Nhà cấp 3' },
  { value: 'Nhà_Cấp_2', label: 'Nhà cấp 2' },
  { value: 'Nhà_Cấp_1', label: 'Nhà cấp 1' },
  { value: 'Nhà_Cấp_0', label: 'Nhà cấp 0' }
];

const priceMarks = {
  0: '0',
  2000000000: '2 tỷ',
  5000000000: '5 tỷ',
  10000000000: '10 tỷ',
  15000000000: '15 tỷ+'
};

const ProjectFilters = ({
  filters = { typeProject: 'all', status: 'all', priceRange: [0, 15000000000] },
  onChange
}) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onChange({
      typeProject: 'all',
      status: 'all',
      priceRange: [0, 15000000000]
    });
  };

  const handleValuesChange = (changed, all) => {
    onChange(all);
  };

  const activeFiltersCount = 
    (filters.typeProject !== 'all' ? 1 : 0) + 
    (filters.status !== 'all' ? 1 : 0) + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 15000000000 ? 1 : 0);

  return (
    <Card className="sticky top-4 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterOutlined style={{ color: '#4a90e2' }} />
            <CardTitle style={{marginBottom: '0px'}} className="text-lg">Bộ lọc</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              style={{ color: '#4a90e2', borderColor: '#4a90e2' }}
            >
              Đặt lại
            </Button>
          )}
        </div>
      </CardHeader>

        <Form
          form={form}
          layout="vertical"
          initialValues={filters}
          onValuesChange={handleValuesChange}
          style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #f0f1f2' }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="typeProject" label="Loại hình dự án">
                <Select>
                  {typeOptions.map(opt => (
                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="status" label="Trạng thái dự án">
                <Select>
                  {statusOptions.map(opt => (
                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="priceRange" label="Khoảng giá (VND)">
                <Slider
                  range
                  min={0}
                  max={15000000000}
                  step={100000000}
                  marks={priceMarks}
                  tipFormatter={val => `${(val / 1000000000).toFixed(1)} tỷ`}
                  style={{ color: '#4a90e2', paddingRight: '10px' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Khoảng giá phổ biến</Label>
          <div style={{paddingTop: '10px'}} className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                form.setFieldValue('priceRange', [0, 2000000000]);
                onChange({ ...form.getFieldsValue(), priceRange: [0, 2000000000] });
              }}
              className="justify-start text-left border-emerald-200 hover:bg-emerald-50"
            >
              Dưới 2 tỷ VND
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                form.setFieldValue('priceRange', [2000000000, 5000000000]);
                onChange({ ...form.getFieldsValue(), priceRange: [2000000000, 5000000000] });
              }}
              className="justify-start text-left border-emerald-200 hover:bg-emerald-50"
            >
              2 - 5 tỷ VND
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                form.setFieldValue('priceRange', [5000000000, 10000000000]);
                onChange({ ...form.getFieldsValue(), priceRange: [5000000000, 10000000000] });
              }}
              className="justify-start text-left border-emerald-200 hover:bg-emerald-50"
            >
              5 - 10 tỷ VND
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                form.setFieldValue('priceRange', [10000000000, 15000000000]);
                onChange({ ...form.getFieldsValue(), priceRange: [10000000000, 15000000000] });
              }}
              className="justify-start text-left border-emerald-200 hover:bg-emerald-50"
            >
              Trên 10 tỷ VND
            </Button>
          </div>
        </div>
        </Form>

        {/* Quick Price Filters */}
        
    </Card>
  );
};

export default ProjectFilters;
