import Auth from './auth/reducer';
import App from './app/reducer';
import Mails from './mail/reducer';
import Calendar from './calendar/reducer';
import Box from './box/reducer';
import Notes from './notes/reducer';
import Todos from './todos/reducer';
import DynamicChartComponent from './dynamicEchart/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import PlatformSwitcher from './platformSwitcher/reducer';
import DevReducers from '../customApp/redux/reducers';

export default {
  Auth,
  App,
  ThemeSwitcher,
  PlatformSwitcher,
  Mails,
  Calendar,
  Box,
  Notes,
  Todos,
  DynamicChartComponent,
  ...DevReducers
};
