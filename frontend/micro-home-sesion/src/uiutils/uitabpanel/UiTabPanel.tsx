import React from "react";
import { Component } from 'react';
import { UiTabPanelState } from './UiTabPanelState';
import { UiTabPanelProps } from './UiTabPanelProps';
import UiIcon from 'shared/UiIcon';
import '../../resources/css/UiTabPanel.css';

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
    this.props.callback(tabId)     
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
    if (prevProps.data !== this.props.data) {
      this.setState({ 
        tabs: this.props.data,
        activeTab: this.props.data.length > 0 ? this.props.data[0].id : ''
      });
    }
  }

  render() {
    const { activeTab, tabs } = this.state;
    return (
      <div className="tab-panel">
        <div className="tab-title">
          <ul className="tab-title-list">
            {tabs.map(tab => (
              <li className="tab-item" key={tab.id}>
                  <button
                    onClick={() => this.handleTabClick(tab.id)}
                    className={`tab-button ${
                    activeTab === tab.id ? 'active' : ''
                  }`}
                  >
                    <UiIcon name={tab.icon} className="icon" />
                    {tab.label}
                    {activeTab === tab.id && (
                    <button
                      onClick={() => {
                        this.handleTabClose(tab.id)                
                      }}
                      type='button'
                      className="tab-close"
                    >
                      <UiIcon
                        name="CloseCircle"
                      />
                    </button>

                  )}
                  </button>
                  
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    );
  }
}

export default UiTabPanel;