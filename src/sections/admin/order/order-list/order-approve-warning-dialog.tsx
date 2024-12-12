import { Dialog, DialogTitle, DialogActions, Button, DialogProps, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useMemo } from 'react';
import useFunction from 'src/hooks/use-function';
import { OrderDetail } from 'src/types/order';
import { Warning2 } from 'iconsax-react';

function OrderApproveWarningDialog({
  orders,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  orders: OrderDetail[];
  onConfirm?: () => Promise<any>;
}) {
  const onConfirmHelper = useFunction(onConfirm!, {
    successMessage: 'Phê duyệt các đơn hàng thành công!'
  });
  const orderList = useMemo(() => {
    return orders?.map((order) => order.checkCode).join(', ');
  }, [orders]);
  return (
    <Dialog fullWidth maxWidth='xs' {...dialogProps}>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Warning2 size='50' color='red' variant='Bold' />
          <Typography textAlign={'center'} fontWeight={'bold'}>
            Có {orders?.length} đơn hàng: {orderList} không thể phê duyệt, bạn có muốn phê duyệt các
            đơn hàng còn lại?
          </Typography>
        </Box>
      </DialogTitle>
      <DialogActions className='flex justify-center'>
        <Button
          variant='contained'
          color={'inherit'}
          onClick={(e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
          }}
        >
          Hủy
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={async (e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            await onConfirmHelper.call({});
          }}
        >
          Phê duyệt
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderApproveWarningDialog;
