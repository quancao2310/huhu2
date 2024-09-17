import { ArrowBack, CheckBox } from '@mui/icons-material';
import { Box, Button, Drawer, Paper, Typography } from '@mui/material';
import FormInput from 'src/components/ui/FormInput';
import { Stack } from '@mui/system';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import useFunction from 'src/hooks/use-function';
import { useAuth } from 'src/hooks/use-auth';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import ReportProofComponent from '../report/report-proof-component';
import { OrderDetail } from 'src/types/order';

function OrderDetailReportDrawer({
  open,
  onClose,
  order
}: {
  open: boolean;
  onClose: () => void;
  order?: OrderDetail;
}) {
  const { user } = useAuth();

  return (
    <>
      <Drawer
        anchor='right'
        open={open}
        PaperProps={{
          sx: {
            width: 600
          }
        }}
        onClose={onClose}
      >
        <form onSubmit={() => {}}>
          <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <Box>
                <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    <ArrowBack
                      fontSize='small'
                      sx={{
                        verticalAlign: 'middle'
                      }}
                    />{' '}
                    Quay lại
                  </Typography>
                </Box>
                <Typography variant='h6'>Khiếu nại đơn hàng #{order?.code}</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center'
                }}
              >
                <Button color='inherit' variant='contained' onClick={onClose}>
                  Hủy bỏ
                </Button>
                <Button variant='contained' color='primary' type='submit'>
                  Cập nhật
                </Button>
              </Box>
            </Box>
          </Paper>
          <Stack spacing={3} padding={3}>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <Typography variant='h6'>Nội dung khiếu nại</Typography>
              <FormInput type='text' className='w-full px-3 rounded-lg ' />
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <ReportProofComponent label='Minh chứng' />
            </Box>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}

export default OrderDetailReportDrawer;
