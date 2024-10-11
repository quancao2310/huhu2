import React, { useState, useMemo, useCallback } from 'react';
import { CustomTable } from '@components';
import { Box } from '@mui/material';
import { ReportDetail } from 'src/types/report';
import usePagination from 'src/hooks/use-pagination';
import { SelectChangeEvent } from '@mui/material';
import { useDrawer, useDialog } from '@hooks';
import { UserDetail } from 'src/types/user';
import getStaffTableConfig from './staff-table-config';
import StudentFilter from './staff-filter';
import { useRouter } from 'next/router';
import UpdateRoleDialog from '../../update-role-dialog';
import DeleteUserDialog from '../../delete-user-dialog';
import { useUsersContext } from '@contexts';

function StaffList() {
  const router = useRouter();
  const { getListUsersApi, deleteUser } = useUsersContext();
  const deleteStaffDialog = useDialog<UserDetail>();
  const updateRoleDialog = useDialog<UserDetail>();
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const staffList = useMemo(() => {
    return (getListUsersApi.data || []).filter((user) => user.role === 'STAFF');
  }, [getListUsersApi.data]);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null
  });

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value as string);
  };

  const handleDateChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(range);
  };

  const handleResetFilters = () => {
    setSelectedStatus('');
    setDateRange({ startDate: null, endDate: null });
  };

  const handleGoStaff = useCallback((staff: UserDetail) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, staffId: staff.id }
    });
  }, []);

  const filteredStaffs = useMemo(() => {
    return staffList.filter((staff) => {
      const matchesDateRange =
        dateRange.startDate && dateRange.endDate
          ? new Date(Number(staff.createdAt) * 1000) >= dateRange.startDate &&
            new Date(Number(staff.createdAt) * 1000) <= dateRange.endDate
          : true;
      const matchesStatus = selectedStatus === '' ? true : staff.status === selectedStatus;
      return matchesDateRange && matchesStatus;
    });
  }, [dateRange, selectedStatus, staffList]);

  const pagination = usePagination({
    count: filteredStaffs.length
  });

  const staffTableConfig = useMemo(() => {
    return getStaffTableConfig({
      onClickUpgrade: (data: UserDetail) => {
        updateRoleDialog.handleOpen(data);
      },
      onClickDelete: (data: UserDetail) => {
        deleteStaffDialog.handleOpen(data);
      }
    });
  }, []);

  return (
    <Box className='px-6 text-black bg-white'>
      <StudentFilter
        selectedStatus={selectedStatus}
        dateRange={dateRange}
        onDateChange={handleDateChange}
        onStatusChange={handleStatusChange}
        onResetFilters={handleResetFilters}
        numberOfStaff={filteredStaffs.length}
      />
      <CustomTable
        rows={filteredStaffs}
        configs={staffTableConfig}
        pagination={pagination}
        onClickRow={(data: UserDetail) => handleGoStaff(data)}
      />
      <DeleteUserDialog
        open={deleteStaffDialog.open}
        user={deleteStaffDialog.data as UserDetail}
        onClose={deleteStaffDialog.handleClose}
        onConfirm={() => deleteUser(deleteStaffDialog.data?.id as string)}
      />
      <UpdateRoleDialog
        open={updateRoleDialog.open}
        user={updateRoleDialog.data as UserDetail}
        onClose={updateRoleDialog.handleClose}
      />
    </Box>
  );
}

export default StaffList;