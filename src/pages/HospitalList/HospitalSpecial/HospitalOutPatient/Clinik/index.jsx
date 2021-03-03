import React, {Component} from 'react';
import {Button, PageHeader, Row, Space, Statistic, Table} from "antd";
import {history} from "@/.umi/core/history";
import {getClinics} from "@/pages/HospitalList/HospitalSpecial/HospitalOutPatient/Clinik/service";


class Clinik extends Component {

  state = {
    clinics: [],
    oname: "",
  }

  componentDidMount() {
    let record = this.props.location.state.record;
    let clinics = getClinics(record.hid, record.oid, record.sid);
    this.setState({oname: record.oname,})
    clinics.then((res) => {
      res.forEach(r => {
        r.key = r.cid;
      })
      console.log(res);
      this.setState({clinics: res});
    }).catch(() => {
      this.setState({clinics: []});
    })

  }

  render() {
    let {clinics} = this.state;

    const columns = [
      {
        title: '诊室名称',
        dataIndex: 'oname',
        key: 'oname'
      },
      {
        title: '诊室地址',
        dataIndex: 'address',
        key: 'address'
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Button type={"primary"}>查看详情</Button>
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
          title={`${this.state.oname}`}
          subTitle={"诊室详情"}
        >
          <Row>
            <Statistic title="诊室数" value={this.state.clinics.length}/>
          </Row>
        </PageHeader>
        <Table dataSource={clinics} pagination={{defaultPageSize: 5}} columns={columns}/>
      </div>
    );
  }
}

export default Clinik;
