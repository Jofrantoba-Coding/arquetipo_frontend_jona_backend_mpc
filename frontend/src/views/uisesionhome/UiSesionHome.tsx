import { Component } from 'react';
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import Footer from '../../uiutils/uifooterbar/UiFooterBar';
import UiMenuBar from '../../uiutils/uimenubar/UiMenuBar';
import { getMenu } from '../../services/api-mantenimientos/menu';
import { getCurrentProfile } from '../../services/api-mantenimientos/perfil';
import UiTabPanel from '../../uiutils/uitabpanel/UiTabPanel';
import { UiDistritoGridImpl } from '../uidistritogrid/UiDistritoGridImpl';

export class UiSesionHome extends Component {

  state = {
    menuData: null,
    profileData: null,
    loading: true,
    tabsData: []
  };

  async componentDidMount() {
    try {

      const tabs = [
        {
          id: 'distrito',
          label: 'Distrito',
          icon: 'Build',
          content: <UiDistritoGridImpl />
        },
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'Build',
          content: <div>Dashboard Content</div>
        }
      ]

      const [menuData, profileData]: any[] = await Promise.all([
        getMenu(),
        getCurrentProfile()
      ]);
      this.setState({ menuData, profileData: profileData[0], tabsData: tabs, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error fetching menu data:', error);
    }
  }

  render() {
    const { menuData, profileData, tabsData, loading } = this.state;

    return (
      !loading && (
        <BorderLayout
          north={
            profileData && (<UiTitleBar data={profileData} />)
          }
          south={<Footer />}
          center={
            (<>
              { menuData && (<UiMenuBar data={menuData} />) }
              <UiTabPanel data={tabsData} />
            </>)
          }
        />)
    );
  }
}

export default UiSesionHome;
