import { getCurrentPlatform } from '../../containers/PlatformSwitcher/config';

const actions = {
  CHANGE_PLATFORM: 'CHANGE_PLATFORM',
  SWITCH_ACTIVATION: 'SWITCH_ACTIVATION',
  switchActivation: () => ({ type: actions.SWITCH_ACTIVATION }),
  changePlatform: (code) => {
    const selectedPlatform = getCurrentPlatform(code);
    let auth = JSON.parse(localStorage.getItem('auth'));
    auth.currentApp = code;
    localStorage.setItem('auth', JSON.stringify(auth));
    return {
      type: actions.CHANGE_PLATFORM,
      selectedPlatform
    };
  }
};
export default actions;
