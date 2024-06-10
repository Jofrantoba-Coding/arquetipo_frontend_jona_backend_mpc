import { Component } from 'react';
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import Footer from '../../uiutils/uifooterbar/UiFooterBar';
import UiMenuBar from '../../uiutils/uimenubar/UiMenuBar';
import { getMenu } from '../../services/menu';
import { getCurrentProfile } from '../../services/perfil';
import UiTabPanel from '../uitabpanel/UiTabPanel';
import UiDistritoMantenimiento from '../uidistritomantenimiento/UiDistritoMantenimiento';

export class UiSesionHome extends Component {

  state = {
    menuData: null,
    profileData: null,
    loading: true,
    tabsData: [
      {
        id: 'distrito',
        label: 'Distrito',
        icon: 'Build',
        content: <UiDistritoMantenimiento />
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'Build',
        content: <div>Dashboard Content</div>
      }
    ]
  };

  async componentDidMount() {
    try {
      const menuData = await getMenu();
      const profileData = await getCurrentProfile();
      this.setState({ menuData, profileData: profileData[0], loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error fetching menu data:', error);
    }
  }

  render() {
    const { menuData, profileData, tabsData, loading } = this.state;

    return (
      <BorderLayout
        north={
          !loading && (
            profileData && <UiTitleBar data={profileData} />
          )
        }
        south={<Footer />}
        center={
          <>
          {!loading && (
            menuData && <UiMenuBar data={menuData} />
          )}
          <UiTabPanel data={tabsData} />
          </>
        }
      />
    );
  }
}

export default UiSesionHome;
