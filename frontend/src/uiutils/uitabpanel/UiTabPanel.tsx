import { Component } from 'react';
import { UiTabPanelState } from './UiTabPanelState';
import { UiTabPanelProps } from './UiTabPanelProps';
import UiIcon from '../uiicon/UiIcon';

class UiTabPanel extends Component<UiTabPanelProps, UiTabPanelState> {
  constructor(props: UiTabPanelProps) {
    super(props);

    const { data } = props;

    this.state = {
      activeTab: 'distrito',
      tabs: data
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleTabClose = this.handleTabClose.bind(this);
  }

  handleTabClick(tabId: string) {
    this.setState({ activeTab: tabId });
    console.log(tabId);
  }

  handleTabClose(tabId: string) {
    this.setState((prevState) => {
      const newTabs = prevState.tabs.filter(tab => tab.id !== tabId);
      let newActiveTab = prevState.activeTab;
      if (prevState.activeTab === tabId) {
        if (newTabs.length > 0) {
          newActiveTab = newTabs[0].id;
        } else {
          newActiveTab = '';
        }
      }
      console.log("New active tab:", newActiveTab);
      return {
        tabs: newTabs,
        activeTab: newActiveTab
      };
    }, () => {
      console.log("State updated:", this.state);
    });
  }

  componentDidUpdate(prevProps: UiTabPanelProps) {
    // Solo actualizar el estado si `data` ha cambiado
    if (prevProps.data !== this.props.data) {
      // Actualiza `tabs` con los nuevos datos
      this.setState({ 
        tabs: this.props.data,
        // Mantener el `activeTab` actual si sigue existiendo, de lo contrario establecer el primer tab como activo
        activeTab: this.props.data.length > 0 ? this.props.data[0].id : ''
      });
    }
    console.log('tabs udpdate', this.props)
  }

  render() {
    console.log('entra tabs');
    const { activeTab, tabs } = this.state;

    return (
      <div className="tab-panel">
        <div className="border-b border-gray-200">
          <ul className="flex px-4 flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
            {tabs.map(tab => (
              <li className="tab-item" key={tab.id}>
                  <a
                    href="#"
                    onClick={() => this.handleTabClick(tab.id)}
                    className={`relative inline-flex items-center justify-center py-4 px-8 border-b-2 rounded-t-xl group ${
                    activeTab === tab.id ? 'text-white bg-[#DD3333] border-[#DD3333]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                  >
                    <UiIcon name={tab.icon} className="mr-2" />
                    {tab.label}
                    {activeTab === tab.id && (
                    <button
                      onClick={() => this.handleTabClose(tab.id)}
                      type='button'
                      className="ml-2 absolute top-[-5px] right-[-5px] text-2xl rounded-full border-2 border-red-600 cursor-pointer"
                    >
                      <UiIcon
                        name="CloseCircle"
                      />
                    </button>

                  )}
                  </a>
                  
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    );
  }
}

export default UiTabPanel;