import { faPlusSquare, faHouseUser, faAssistiveListeningSystems, faWater } from '@fortawesome/free-solid-svg-icons'
const auth = JSON.parse(localStorage.getItem('auth'));
const studentPortal = ['sClassroom'];
const facultyPortal = ['fClassroom', 'fTracking'];
const headPortal = ['fClassroom', 'fTracking'];
const masterPortal = ['fClassroom', 'fTracking'];
const adminPortal = ['aEnrollment', 'aTracking'];
const superadminPortal = ['aHeadquarter', 'fTracking'];
const devPortal = ['aForbidden', 'aHeadquarter'];
const portalList = {
  id: 'portalList',
  defaultPlatform: auth ? auth.currentApp : undefined,
  options: [
    {
      name: 'Classroom',
      code: 'sClassroom',
      text: 'Class Management System',
      icon: faAssistiveListeningSystems,
      isPremium: false,
      dafaultUrl: '/cr/banner',
    },
    //Faculty
    {
      name: 'Classroom',
      code: 'fClassroom',
      text: 'Class Management System', // with Class Advisory 
      icon: faAssistiveListeningSystems,
      isPremium: false,
      dafaultUrl: '/classroom/banner',
    },
    {
      name: 'Elesson',
      code: 'fTracking',
      text: 'Document Management System',
      icon: faPlusSquare,
      isPremium: true,
      dafaultUrl: '/tracking/banner',
    },
    // Admin
    {
      name: 'Forbidden',
      code: 'aForbidden',
      text: 'Pinagbabawal',
      icon: faWater,
      isPremium: false,
      dafaultUrl: '/forbidden/banner',
    },
    {
      name: 'Headquarter',
      code: 'aHeadquarter',
      text: 'Headquarter Management System',
      icon: faHouseUser,
      isPremium: false,
      dafaultUrl: '/hq/banner',
    },
    {
      name: '(a)Data Tracking',
      code: 'aTracking',
      text: 'Document Management System',
      icon: faPlusSquare,
      isPremium: true,
      dafaultUrl: '/tracking/banner',
    },
  ],
};

const customizedPlatforms = {
  studentPortal,
  facultyPortal,
  adminPortal,
  superadminPortal,
  devPortal,
  masterPortal,
  headPortal,
  portalList
};
export function getCurrentPlatform(code) {
  const selectedPlatform = portalList.options.find(platform => platform.code === code);
  return selectedPlatform ? selectedPlatform : portalList.options[1];
}
export default customizedPlatforms;
