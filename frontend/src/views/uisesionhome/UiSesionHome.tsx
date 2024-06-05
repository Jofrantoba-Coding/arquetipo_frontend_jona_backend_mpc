import { Component } from 'react';
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import Footer from '../../uiutils/uifooterbar/UiFooterBar';
import UiMenuBar from '../../uiutils/uimenubar/UiMenuBar';
import { getMenu } from '../../services/menu';
import { getCurrentProfile } from '../../services/user';

export class UiSesionHome extends Component {

  state = {
    menuData: null,
    profileData: null,
    loading: true,
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
    const { menuData, profileData, loading } = this.state;

    return (
      <BorderLayout
        north={
          !loading && (
            profileData && <UiTitleBar data={profileData} />
          )
        }
        south={<Footer />}
        center={
          !loading && (
            menuData && <UiMenuBar data={menuData} />
          )
        }
      />
    );
  }
}

export default UiSesionHome;
