import Dashboard from "./dashboard";

export default [
  ...Dashboard,
  {
    title: "Dashboard",
    route: "Home",
    icon: "HomeIcon",
  },

 
  {
    header: 'Membership',
  },
  {
    title: "Sections",
    route: "sections",
    icon: "CompassIcon",
  },

  {
    title: "Types",
    route: "member",
    icon: "UserIcon",
  },

  {
    title: "Members",
    route: "member",
    icon: "UserIcon",
  },

  {
    title: "Onboarding",
    route: "enroll",
    icon: "AwardIcon",
  },

  {
    header: 'Payments',
  },
  {
    title: "Products",
    route: "member",
    icon: "UserIcon",
  },
  {
    title: "Debts",
    route: "member",
    icon: "UserIcon",
  },

  {
    title: "Gateways",
    route: "sections",
    icon: "UserIcon",
  },

  {
    title: "History",
    route: "member",
    icon: "UserIcon",
  },

  
  //{
  //  title: 'Payments',
  //  icon: 'MoneyIcon',
  //  children: [
  //    {
  //      title: "Payment History",
  //      route: "member",
  //      icon: "MoneyIcon",
  //    },
    
   //   {
  //      title: "Section",
   //     route: "member",
   //     icon: "FileIcon",
   //   },
   // ],
  //},
  {
    header: 'Admin',
  },
  {
    title: "Settings",
    route: "logout",
    icon: "PowerIcon",
 },

 {
  title: "Admins",
  route: "logout",
  icon: "PowerIcon",
  },

  {
    title: "Profile",
    route: "logout",
    icon: "PowerIcon",
  },

  {
    title: "Logout",
    route: "logout",
    icon: "PowerIcon",
  },
];
