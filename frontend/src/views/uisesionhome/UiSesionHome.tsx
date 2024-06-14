import { Component } from 'react';
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import Footer from '../../uiutils/uifooterbar/UiFooterBar';
import UiMenuBar from '../../uiutils/uimenubar/UiMenuBar';
import { getMenu } from '../../services/api-mantenimientos/menu';
import { getCurrentProfile } from '../../services/api-mantenimientos/perfil';
import UiTabPanel from '../../uiutils/uitabpanel/UiTabPanel';
import { MENU_TABS } from '../../constants/tabs';
import { UiSesionHomeProps } from './UiSesionHomeProps';
import { UiSesionHomeState } from './UiSesionHomeState';
import { Tab } from '../../uiutils/uitabpanel/UiTabPanelState';

export class UiSesionHome extends Component<UiSesionHomeProps, UiSesionHomeState> {

  constructor(props: UiSesionHomeProps) {
    super(props);
    this.state = {
      menuData: [],
      profileData: null,
      loading: true,
      tabsData: []
    };
  }

  callbackMenu = (id: number) => {
    const newTab: Tab | undefined = MENU_TABS.find((item) => item.menuId === id);
    if (newTab) {
      this.setState((prevState) => {
        const tabExists = prevState.tabsData.some((tab) => tab.menuId === id);
        if (!tabExists) {
          return {
            tabsData: [...prevState.tabsData, newTab],
            loading: false
          };
        } else {
          return { tabsData: prevState.tabsData, loading: false };
        }
      }, () => {
        console.log(this.state);
      });
    } else {
      console.log(`No se encontró un elemento con menuId: ${id}`);
    }
  }

  async componentDidMount() {
    try {
      const [menuData, profileData] = await Promise.all([
        getMenu(),
        getCurrentProfile()
      ]);
      this.setState({ 
        menuData, 
        profileData: profileData[0], 
        loading: false 
      });
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
              { menuData && (<UiMenuBar data={menuData} callback={(id) => this.callbackMenu(id)} />) }
              <UiTabPanel data={tabsData} />
            </>)
          }
        />)
    );
  }
}

export default UiSesionHome;