import * as React from 'react';
import { addMDHOC } from './draftjs//addMDHOC';

class Home extends React.Component<{}, {}> {
    render() { return null; }
}

const HomeDoc = addMDHOC(Home, '/placeholder.md');

export { HomeDoc }
