import React from 'react';
import {Menu, Sidebar, Segment, Icon} from 'semantic-ui-react';

function Layout({children}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <React.Fragment>
      <Menu>
        <Menu.Item onClick={toggleSidebar}><Icon name="bars" /></Menu.Item>
      </Menu>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible={sidebarOpen}
          width="wide">
          <Menu.Item as="a">City</Menu.Item>
          <Menu.Item as="a">City</Menu.Item>
          <Menu.Item as="a">City</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>{children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </React.Fragment>
  );
}

export default Layout;
