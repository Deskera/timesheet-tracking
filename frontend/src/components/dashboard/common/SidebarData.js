import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Employees',
        path: '/dashboard/employee-info',
        icon: <IoIcons.IoIosPaper />,
    },
    {
        title: 'My Report',
        path: '/dashboard/my-report',
        icon: <FaIcons.FaEnvelopeOpenText />,
    },
    {
        title: 'Team Report',
        path: '/dashboard/team-report',
        icon: <IoIcons.IoIosPaper />
    }
];
