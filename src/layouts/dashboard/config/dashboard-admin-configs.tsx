import { paths } from 'src/paths';
import {
  LogoutCurve,
  Category2,
  Box1,
  User,
  UserTick,
  NotificationStatus,
  Setting2
} from 'iconsax-react';
import { Bike } from 'lucide-react';

export const getDashboardAdminConfigs = () => {
  return [
    {
      subheader: 'Quản lý',
      items: [
        {
          title: 'Bảng điều khiển',
          path: paths.dashboard.index,
          icon: <Category2 className='h-6 w-6' />
        },
        {
          title: 'Quản lý đơn hàng',
          path: paths.dashboard.order.index,
          icon: <Box1 className='h-6 w-6' />
        },
        {
          title: 'Quản lý chuyến đi',
          path: paths.dashboard.delivery.index,
          icon: <Bike className='h-6 w-6' />
        },
        {
          title: 'Quản lý nhân viên',
          path: paths.dashboard.staff.index,
          icon: <UserTick className='h-6 w-6' />
        },
        {
          title: 'Quản lý người dùng',
          path: paths.dashboard.student.index,
          icon: <User className='h-6 w-6' />
        },
        {
          title: 'Khiếu nại',
          path: paths.dashboard.report.index,
          icon: <NotificationStatus className='h-6 w-6' />
        }
      ]
    },
    {
      subheader: 'Tài khoản',
      items: [
        {
          title: 'Cài đặt',
          path: paths.dashboard.accounts.index,
          icon: <Setting2 className='h-6 w-6' />
        },
        {
          title: 'Đăng xuất',
          path: paths.auth.logout,
          icon: <LogoutCurve size='20px' variant='Bold' />
        }
      ]
    }
  ];
};
