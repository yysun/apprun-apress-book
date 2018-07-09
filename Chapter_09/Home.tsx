import app, { Component } from 'apprun';
import { Row, Column, Card, Alert, Sidebar } from './ui';
import DataTable from './table';
import Chart from './chart';
import Calender from './calendar';
import './map';

const Alerts = () => <Row>
  <Column>
    <Alert className="alert-primary">Primary</Alert>
  </Column>
  <Column>
    <Alert className="alert-secondary">Secondary</Alert>
  </Column>
  <Column>
    <Alert className="alert-success">Success</Alert>
  </Column>
  <Column>
    <Alert className="alert-danger">Danger</Alert>
  </Column>
  <Column>
    <Alert className="alert-warning">Warning</Alert>
  </Column>
  <Column>
    <Alert className="alert-info">Info</Alert>
  </Column>
</Row>


const CardList = () => [1, 2, 3, 4, 5, 6].map(i => <div className="col-sm-4 col-lg-2">
  <Card>
    <div className="card-body text-center">
      <div className="text-right text-green">
        {(Math.random() * 10).toFixed(1)} %
      </div>
      <div className="h1 m-0">{(Math.random() * 100).toFixed(0)}</div>
      <div className="text-muted">KPI #{i}</div>
    </div>
  </Card>
</div>
)

const menus = [
  { icon: 'home', text: 'Home', href: '#' },
  { icon: 'star', text: 'Events', href: '#' },
  { icon: 'book', text: 'Teams', href: '#' },
  { icon: 'heart', text: 'Favorites', href: '#' },
  {
    icon: 'list', text: 'More', href: '#', menus:
      [
        { icon: 'check', text: 'Link 1', href: '#' },
        { icon: 'check', text: 'Link 2', href: '#' },
        { icon: 'check', text: 'Link 3', href: '#' },
      ]
  }
];

export default class HomeComponent extends Component {

  state = 'Dashboard';
  view = (state) => <Sidebar menus={menus}>
    <Row>
      <CardList />
    </Row>
    <Alerts />
    <Row>
      <Column className="col-lg-6">
        <Card header="Chart">
          <Chart />
        </Card>
      </Column>
      <Column className="col-lg-6">
        <Card header="D3 Map">
          <div id="map"></div>
        </Card>
      </Column>
    </Row>
    <Row className="data-tables">
      <Column>
        <DataTable />
      </Column>
    </Row>
    <Row>
      <Column>
        <Calender />
      </Column>
    </Row>
  </Sidebar>

  update = {
    '#Home': state => state,
  }
}

