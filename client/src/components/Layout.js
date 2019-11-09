import React from 'react';
import { Menu, Sidebar, Segment } from 'semantic-ui-react';

function Layout({children}) {
  return (
    <React.Fragment>
      <Menu>
        <Menu.Item>
          Logo
        </Menu.Item>
      </Menu>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='push'
          icon='labeled'
          inverted
          vertical
          visible={true}
          width='wide'
        >
          <Menu.Item as='a'>
            Home
          </Menu.Item>
          <Menu.Item as='a'>
            Games
          </Menu.Item>
          <Menu.Item as='a'>
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            {children}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </React.Fragment>
  );
}

export default Layout;
