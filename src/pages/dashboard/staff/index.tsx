import React, { useMemo } from 'react';
import type { Page as PageType } from 'src/types/page';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import ContentHeader from 'src/components/content-header';
import { Box, Button } from '@mui/material';
import StaffList from 'src/sections/admin/staff/staff-list';
import StaffDetail from './[staffId]';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';
import UsersProvider from 'src/contexts/users/users-context';
import MobileStaffList from 'src/sections/mobile/admin/staff/staff-list';
import { useResponsive } from 'src/utils/use-responsive';

const Page: PageType = () => {
  const { isMobile } = useResponsive();
  const router = useRouter();
  return router.query.staffId ? (
    <StaffDetail />
  ) : isMobile ? (
    <MobileStaffList />
  ) : (
    <Box className='text-black bg-white min-h-screen'>
      <ContentHeader
        title='Quản lý nhân viên'
        rightSection={
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Button variant='contained' color='success' startIcon={<Add />}>
              Thêm nhân viên
            </Button>
          </Box>
        }
      />
      <StaffList />
    </Box>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <UsersProvider>{page}</UsersProvider>
  </DashboardLayout>
);

export default Page;
