export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'hospital.list',
                icon: 'BranchesOutlined',
                path: '/Hospitallist',
                component: './HospitalList',
              },
              {
                name: 'hospital.Special',
                icon: 'HddOutlined',
                path: '/SpecialList',
                component: './SpecialList',
              },
              {

                hideInMenu:true,
                path: '/SpecialList/OutPaitents/*',
                component: './SpecialList/OutPaitents'
              },
              {

                hideInMenu:true,
                path: '/Hospitallist/HospitalSpecial/*',
                component: './HospitalList/HospitalSpecial'
              },
              {
                hideInMenu: true,
                path: '/HospitalOutPatient',
                component: './HospitalList/HospitalSpecial/HospitalOutPatient'
              },
              {
                hideInMenu: true,
                path: '/Clinik',
                component: './HospitalList/HospitalSpecial/HospitalOutPatient/Clinik'
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
