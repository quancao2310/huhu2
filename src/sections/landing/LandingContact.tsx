import { Box, Card, Stack, Typography, Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';

interface InfoProps {
  title: string;
  value: string | string[];
}

export const LandingContact = () => {
  const infoList: InfoProps[] = [
    {
      title: 'Địa chỉ',
      value: 'Ký túc xá khu A, Đại học Quốc gia TP.HCM'
    },
    {
      title: 'Số điện thoại',
      value: ['0862 898 859', '0944 877 824']
    },
    {
      title: 'Email',
      value: 'duytan17112003@gmail.com'
    }
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <Box
      color={'black'}
      sx={{
        background: 'linear-gradient(to left, #ffffff 30%, #9FD596 70%)'
      }}
      paddingY={5}
    >
      <Typography variant='h4' textAlign={'center'} marginBottom={5}>
        Liên hệ với chúng tôi
      </Typography>
      <Box display={'flex'} gap={2} justifyContent={'center'} alignItems={'center'}>
        <Card sx={{ bgcolor: '#5BE23D', padding: 4, width: '20%' }}>
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            {infoList.map((info, index) => (
              <Stack key={index}>
                <Typography color='black' fontWeight={'bold'}>
                  {info.title}
                </Typography>
                {Array.isArray(info.value) ? (
                  info.value.map((value, index) => (
                    <Typography key={index} color='white'>
                      {value}
                    </Typography>
                  ))
                ) : (
                  <Typography color='white'>{info.value}</Typography>
                )}
              </Stack>
            ))}
          </Box>
        </Card>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Họ và tên'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id='email'
                name='email'
                label='Email'
                type='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='message'
                name='message'
                label='Phản hồi của bạn'
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant='outlined'
              />
            </Grid>
          </Grid>
          <Button color='primary' variant='contained' type='submit'>
            Gửi phản hồi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
