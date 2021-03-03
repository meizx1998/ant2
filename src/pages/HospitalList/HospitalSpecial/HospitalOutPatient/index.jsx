import React, {Component} from 'react';
import {Button, PageHeader, Row, Space, Statistic, Table} from "antd";
import {history} from "@/.umi/core/history";
import {getoutPatient} from "@/pages/HospitalList/HospitalSpecial/HospitalOutPatient/service";


const columns = [
  {
    title: '门诊名称',
    dataIndex: 'oname',
    key: 'oname'
  },
  {
    title: '诊室数',
    dataIndex: 'num',
    key: 'num'
  },

  {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <Button onClick={event => {
            history.push({pathname: "/Clinik", state: {record}})
          }} type={"primary"}>查看诊室</Button>
        </Space>
      )
    }
  }
]

class HospitalOutPatient extends Component {

  state = {
    hname: "医院名",
    sname: '专科名',
    outPatients: []

  }

  constructor() {
    super();
  }

  componentDidMount() {
    let record = this.props.location.state.record;

    getoutPatient(record.hid, record.sid).then((res) => {
      console.log(res);
      this.setState({
        hname: record.hname,
        sname: record.name,
        outPatients: res
      })
    });

  }

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            history.goBack()
          }}
          title={`${this.state.hname}-${this.state.sname}`}
          subTitle={"门诊详情"}
        >
          <Row>
            <Statistic title="门诊数" value={this.state.outPatients.length}/>
            <Statistic
              title="诊室数"
              value={128}
              style={{
                margin: '0 32px',
              }}
            />

          </Row>
        </PageHeader>

        <Table dataSource={this.state.outPatients} pagination={{defaultPageSize: 5}} columns={columns}/>
      </div>
    );
  }
}

export default HospitalOutPatient;
