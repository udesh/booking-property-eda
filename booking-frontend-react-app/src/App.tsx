import React, { ReactNode } from 'react';
import './App.css';
import axios from 'axios';
import moment from "moment";
import { Steps, Button, message, DatePicker, Layout, Select, Card, Row, Col, Table, Progress } from 'antd';
const { Option } = Select;
const { Header, Content } = Layout;
const { Step } = Steps;

const steps = [
  {
    title: 'Enter details',
  },
  {
    title: 'Vendor Availability',
  },
  {
    title: 'Complete your booking',
  },
];

const App = () => {
  const [current, setCurrent] = React.useState(0);
  const [selectedVendorId, setSelectedVendorId] = React.useState("-");
  const [selectedServiceType, setSelectedServiceType] = React.useState("-");
  const [selectedAreaType, setSelectedAreaType] = React.useState("-");
  const [selectedLocationId, setSelectedLocationId] = React.useState("-");
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedBookingTime, setSelectedBookingTime] = React.useState("");
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  const next = () => {
    if (current === 0 && (selectedVendorId === "-" || selectedServiceType === "-" || selectedAreaType === "-" || selectedLocationId === "-")) {
      message.error('Select all details before proceed...')
    } else {
      setCurrent(current + 1);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const complete = () => {
    message.success('Registered your booking with vendor!')
    setCurrent(0);
    setSelectedVendorId("-");
    setSelectedServiceType("-");
    setSelectedAreaType("-");
    setSelectedLocationId("-");
    setSelectedDate(moment(new Date()).format('YYYY-MM-DD'));
  };
  const columns = [
    {
      title: 'Time Slots',
      dataIndex: 'name',
      render: (text: React.ReactNode) => <li>{text}</li>,
    }
  ];
  const data = [
    { key: '1', name: '08:00', status: 'inactive' }, { key: '2', name: '08:30', status: 'inactive' },
    { key: '3', name: '09:00', status: 'inactive' }, { key: '4', name: '09:30', status: 'inactive' },
    { key: '5', name: '10:00', status: 'inactive' }, { key: '6', name: '10:30', status: 'inactive' },
    { key: '7', name: '11:00', status: 'inactive' }, { key: '8', name: '11:30', status: 'inactive' },
    { key: '9', name: '12:00', status: 'inactive' }, { key: '10', name: '12:30', status: 'inactive' },
    { key: '11', name: '13:00', status: 'inactive' }, { key: '12', name: '13:30', status: 'inactive' },
    { key: '13', name: '14:00', status: 'inactive' }, { key: '14', name: '14:30', status: 'inactive' },
    { key: '15', name: '15:00', status: 'inactive' }, { key: '16', name: '15:30', status: 'inactive' },
    { key: '17', name: '16:00', status: 'inactive' }, { key: '18', name: '16:30', status: 'inactive' },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedBookingTime(selectedRows[0].name);
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: { name: string, status: string }) => ({
      disabled: record.status === 'inactive',
      name: record.name,
    }),
  };
  const Day = () => {
    return (
      <div>
        <DayBookings></DayBookings>
      </div>
    );
  };
  const CompleteBooking = () => {
    return (
      <div style={{ margin: '50px 1px 100px' }}>

        <Card title="Booking Confirm">
          <Progress
            type="circle"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            percent={100}
          />
          <li>You are about to complete your booking.</li>
          <li>Start time : {selectedDate}:{selectedBookingTime}</li>

        </Card>
      </div>
    );
  };
  const DetailsCapture = () => (
    <div style={{ margin: '50px 1px 100px' }} id="detailsCapture">
      <div className="site-card-wrapper">
        <Row gutter={10}>
          <Col span={4}>
            <Card title="Booking Date" bordered={false}>
              <DatePicker style={{ width: 160, margin: '10px 10px 10px' }} format="YYYY-MM-DD"
                value={moment(selectedDate)} onChange={onDateChange}></DatePicker>
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Service Type" bordered={false}>
              <Select defaultValue="Landscaping" style={{ width: 160, margin: '10px 10px 10px' }} value={selectedServiceType}
                onChange={onServiceTypeChange}>
                <Option key="LS" value="LS">Landscaping</Option>
                <Option key="LM" value="LM">Lawn mower</Option>
              </Select>
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Vendor Name" bordered={false}>
              <VendorList />
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Area(square feet)" bordered={false}>
              <Select defaultValue="S" style={{ width: 160, margin: '10px 10px 10px' }} value={selectedAreaType}
                onChange={(e) => setSelectedAreaType(e)}>
                <Option key="S" value="S">500-1000</Option>
                <Option key="M" value="M">1000-2000</Option>
              </Select>
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Location" bordered={false}>
              <LocationList />
            </Card>
          </Col>
        </Row>
      </div>
    </div>

  )
  function onDateChange(date: any, dateString: any) {
    setSelectedDate(dateString);
  }
  function onServiceTypeChange(selectedServiceType: any) {
    setSelectedServiceType(selectedServiceType);
    setSelectedVendorId("-");
  }

  function DayBookings() {
    const [timeslots, setTimeSlots] = React.useState([{ key: '1', name: '08:00', status: 'inactive' }]);
    React.useEffect(() => {
      let unmounted = false;
      async function getTimeSlots() {
        axios.get(`http://localhost:8000/bookings`, {
          params: {
            vendorId: selectedVendorId,
            locationId: selectedLocationId,
            date: selectedDate

          },
        }).then((response) => {
          if (!unmounted) {
            for (let i = 0; data.length > i; i++) {
              if (data[i].name === response.data) {
                for (let j = 0; i > j; j++) {
                  data[j].status = "inactive";
                }

              }
              if (response.data != "16:30") {
                data[i].status = "active";
              }

            };
            setTimeSlots(data);
          }
        }).catch((error) => {

        })
          .finally(() => {

          });
      }
      getTimeSlots();
      return () => {
        unmounted = true;
      };

    }, []);
    return (
      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={timeslots}
        pagination={false}
        size='small'
      />
    );
  }
  function LocationList() {
    const [loading, setLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    interface IProps {
      name: string;
      id: string
    }
    React.useEffect(() => {
      let unmounted = false;
      async function getVendors() {
        const response = await fetch(
          "http://localhost:8000/locations"
        );
        const results = await response.json();
        if (!unmounted) {
          setItems(
            results.map(({ name, id }: IProps) => ({ label: name, value: id }))
          );
          setLoading(false);
        }
      }
      getVendors();
      return () => {
        unmounted = true;
      };
    }, []);
    return (
      <Select style={{ width: 160, margin: '10px 10px 10px' }}
        disabled={loading}
        value={selectedLocationId}
        onChange={(e) => setSelectedLocationId(e)}
      >
        {items.map(({ label, value }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    );
  }

  function VendorList() {
    const [loading, setLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    interface IProps {
      name: ReactNode;
      id: ReactNode
    }
    React.useEffect(() => {
      let unmounted = false;
      async function getVendors() {
        const response = await fetch(
          "http://localhost:8000/vendors?serviceType=" + selectedServiceType
        );
        const results = await response.json();
        if (!unmounted) {
          setItems(
            results.map(({ name, id }: IProps) => ({ label: name, value: id }))
          );
          setLoading(false);
        }
      }
      getVendors();
      return () => {
        unmounted = true;
      };
    }, []);
    return (
      <Select style={{ width: 160, margin: '10px 10px 10px' }}
        disabled={loading}
        value={selectedVendorId}
        onChange={(e) => setSelectedVendorId(e)}
      >
        {items.map(({ label, value }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    );
  }

  function confirmBooking() {
    axios.post(`http://localhost:8000/register`, null, {
      params: {
        vendorId: selectedVendorId,
        locationId: selectedLocationId,
        date: selectedDate,
        timeSlot: selectedBookingTime,
        serviceType: selectedServiceType,
        areaType: selectedAreaType
      },
    }).then((response) => {
      complete();
    }).catch((error) => {

    })
      .finally(() => {

      });
  }

  return (
    <>
      <Layout>
        <Header style={{ padding: 0, textAlign: 'center', color: "white" }} >Demo Booking System </Header>
        <Content style={{ margin: '10% 5% 5%' }}>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div>
            {current === 0 ? <DetailsCapture /> : null}
            {current === 1 ? <Day /> : null}
            {current === 2 ? <CompleteBooking /> : null}
          </div>

          <div className="steps-action">
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button style={{ margin: '1px 16px 20px' }} type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button style={{ margin: '1px 16px 20px' }} value="large" type="primary" onClick={() => confirmBooking()}>
                Confirm Booking
              </Button>
            )}

          </div>
        </Content>
      </Layout>
    </>
  );
};

export default App;
