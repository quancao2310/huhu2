import { IconButton, Typography, Stack, Chip } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { OrderDetail } from 'src/types/order';
import { Edit } from 'iconsax-react';
import { formatUnixTimestamp } from 'src/utils/format-unix-time';

const getOrderTableConfigs = ({
  onClickEdit,
  onClickRow
}: {
  onClickEdit: (data: OrderDetail) => void;
  onClickRow: (data: OrderDetail) => void;
}): CustomTableConfig<OrderDetail['id'], OrderDetail>[] => [
  {
    key: 'checkCode',
    headerLabel: 'Mã đơn hàng',
    type: 'string',
    renderCell: (data) => <Typography>#{data.checkCode}</Typography>
  },
  {
    key: 'product',
    headerLabel: 'Sản phẩm',
    type: 'string',
    renderCell: (data) =>
      data.product ? (
        <Stack direction={'row'}>
          {data.product.map((product, index) => (
            <Typography key={index}>
              {product}
              {index < data.product.length - 1 && ', '}
            </Typography>
          ))}
        </Stack>
      ) : (
        <>Chovy</>
      )
  },
  {
    key: 'address',
    headerLabel: 'Địa chỉ',
    type: 'string'
  },
  {
    key: 'createdAt',
    headerLabel: 'Ngày tạo đơn hàng',
    type: 'string',
    renderCell: (data) => <Typography>{formatUnixTimestamp(data.createdAt!)}</Typography>
  },
  {
    key: 'shippingFee',
    headerLabel: 'Tổng tiền (VNĐ)',
    type: 'string',
    renderCell: (data) => {
      const formattedShippingFee = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(data.shippingFee);

      return <Typography>{formattedShippingFee}</Typography>;
    }
  },
  {
    key: 'paymentMethod',
    headerLabel: 'Phương thức thanh toán',
    type: 'string',
    renderCell: (data) => (
      <Typography>
        {data.paymentMethod === 'AT_DELIVERY'
          ? 'Khi nhận hàng'
          : data.paymentMethod === 'BANK'
            ? 'Qua ngân hàng'
            : 'Qua Momo'}
      </Typography>
    )
  },
  {
    key: 'status',
    headerLabel: 'Trạng thái',
    type: 'string',
    renderCell: (data) => (
      <Chip
        variant='filled'
        label={
          data.status === 'DELIVERED'
            ? 'Đã giao'
            : data.status === 'PENDING'
              ? 'Chờ xử lý'
              : 'Đã hủy'
        }
        color={
          data.status === 'DELIVERED' ? 'success' : data.status === 'PENDING' ? 'warning' : 'error'
        }
      />
    )
  },
  {
    key: 'action',
    headerLabel: 'Khiếu nại',
    type: 'string',
    renderCell: (data) => (
      <Edit
        color='blue'
        size={24}
        className='cursor-pointer'
        onClick={(event) => {
          event.stopPropagation();
          onClickEdit(data);
        }}
      />
    )
  }
];

export default getOrderTableConfigs;
