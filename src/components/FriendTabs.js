import React from "react";
import { Tabs, Tab } from "react-bootstrap";
const FriendTabs = ({ currentTab, handleTabSelect }) => {
  return (
    <Tabs
      id='controlled-tab-example'
      activeKey={currentTab}
      onSelect={handleTabSelect}
    >
      <Tab eventKey='friend' title='Friends'></Tab>
      <Tab eventKey='sent' title='Sent Requests'></Tab>
      <Tab eventKey='received' title='Received Requests'></Tab>
      <Tab eventKey='all' title='All Users'></Tab>
    </Tabs>
  );
};

export default FriendTabs;
