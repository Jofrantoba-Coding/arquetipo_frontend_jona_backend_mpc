import { Component } from 'react';
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import Footer from '../../uiutils/uifooterbar/UiFooterBar';
import UiMenuBar from '../../uiutils/uimenubar/UiMenuBar';
import { getMenu } from '../../services/menu';

export class UiSesionHome extends Component {
  state = {
    menuData: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const data = await getMenu();
      this.setState({ menuData: data, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error fetching menu data:', error);
    }
  }

  render() {
    const { menuData, loading } = this.state;

    return (
      <BorderLayout
        north={<UiTitleBar />}
        south={<Footer />}
        center={
          loading ? (
            <div>Loading...</div>
          ) : (
            menuData && <UiMenuBar menuData={menuData} />
          )
        }
      />
    );
  }
}

export default UiSesionHome;
