import React, {Component} from 'react';
import {PageHeader, Tag, Button, Statistic, Descriptions, Row, Col, Card, Space, Table} from "antd";
import {history} from "@/.umi/core/history";
import {getSpecialByHospitalId} from "@/pages/HospitalList/HospitalSpecial/service";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";

const columns = [
  {
    title: '专科名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '描述',
    dataIndex: 'des',
    key: 'des'
  },
  {
    title: '门诊数',
    dataIndex: 'num',
    key: 'num'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <Button onClick={event => {history.push({pathname:"/HospitalOutPatient",state:{record}})} } type={"primary"}>查看门诊</Button>
        </Space>
      )


    }
  }
]


class HospitalSpecial extends Component {

  state = {
    hospitalName: '医院名称',
    specials: [],
    loading: true,
  }

  componentDidMount() {
    let specialByHospitalId = getSpecialByHospitalId(this.props.match.params[0]);
    specialByHospitalId.then(res => {
      res.forEach((e) => {
        e.key = e.sid;
      });
      this.setState({specials: res,hospitalName:res[0].hname});
    }).catch((err)=>{
      this.setState({})
    })
  }

  render() {

    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            history.goBack()
          }}
          title={this.state.hospitalName}
          subTitle="专科详情"
        >
          <Row>
            <Statistic title="专科数" value={this.state.specials.length}/>
            <Statistic
              title="门诊数"
              value={128}
              style={{
                margin: '0 32px',
              }}
            />
            <Statistic title="科室数" value={334}/>
          </Row>
        </PageHeader>

        <Table dataSource={this.state.specials} pagination={{defaultPageSize: 5}} columns={columns}/>

      </div>

    );

  }
}

export default HospitalSpecial;
