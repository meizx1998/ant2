import React, {Component} from 'react';
import {Button, PageHeader, Row, Space, Statistic, Table} from "antd";
import {history} from "@/.umi/core/history";
import {getoutPatient} from "@/pages/HospitalList/HospitalSpecial/HospitalOutPatient/service";




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
      let sum=0;
     res.forEach(e=>{
       e.key=e.oid;
       sum+=e.cnum;
     })
      this.setState({
        hname: record.hname,
        sname: record.name,
        outPatients: res,
        sum,
      })
    }).catch((err)=>{
      console.log(err);
    });

  }

  render() {
    const columns = [
      {
        title: '门诊名称',
        dataIndex: 'oname',
        key: 'oname'
      },
      {
        title: '诊室数',
        dataIndex: 'cnum',
        key: 'cnum'
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Button onClick={event => {
                this.GoToClick(record);
              }} type={"primary"}>查看诊室</Button>
            </Space>
          )
        }
      }
    ]
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
              value={this.state.sum}
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

  GoToClick(record) {
    record.hname = this.state.hname;
    record.sname = this.state.sname;
    history.push({pathname: "/Clinik", state: {record}})
  }
}

export default HospitalOutPatient;
