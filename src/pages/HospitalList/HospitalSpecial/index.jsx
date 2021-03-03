import React, {Component} from 'react';
import {PageHeader, Tag, Button, Statistic, Descriptions, Row, Col, Card, Space, Table, Select, message} from "antd";
import {history} from "@/.umi/core/history";
import {addHospitalSpecial, getSpecialByHospitalId} from "@/pages/HospitalList/HospitalSpecial/service";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import {getSpecialList} from "@/pages/SpecialList/service";

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
    dataIndex: 'onum',
    key: 'onum'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <Button onClick={event => {
            history.push({pathname: "/HospitalOutPatient", state: {record}})
          }} type={"primary"}>查看门诊</Button>
          <Button danger disabled={record.onum !== 0}>删除专科</Button>
        </Space>
      )
    }
  }
]


class HospitalSpecial extends Component {

  state = {
    hospitalName: '医院名称',
    num: 0,
    specials: [],
    loading: true,
    allSpecials: [],
    willAdd: {}
  }
  handleChange = (e) => {
    let find = this.state.allSpecials.find((special) => {
      return special.name === e;
    });
    console.log(find);
    this.setState({willAdd: find});
  }
  AddSpecial = () => {
    if (this.state.willAdd.id === undefined) {
      message.warn('请先选择专科!');
      return;
    }
    addHospitalSpecial(this.props.match.params[0], this.state.willAdd.id).then(e => {
      message.success('添加成功');
      this.refreshData();
    });
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    let specialByHospitalId = getSpecialByHospitalId(this.props.match.params[0]);


    specialByHospitalId.then(res => {
      let count = 0;
      res.forEach((e) => {
        count += e.onum;
        e.key = e.sid;
      });
      getSpecialList("").then((res2) => {
        res2.items.forEach((r) => {
          r.key = r.id;
          res.forEach(r1 => {
            if (r1.sid === r.id) {
              r.disable = true;
            }
          })
        })
        this.setState({specials: res, hospitalName: res[0].hname, num: count, allSpecials: res2.items});
      })

    }).catch((err) => {
      getSpecialList("").then(res3 => {
        console.log('res3', res3);
        res3.items.forEach(r => {
          r.key = r.id;
        })
        this.setState({allSpecials: res3.items});
      })


    })
  }

  render() {
    const allSpecials = this.state.allSpecials;
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
              value={this.state.num}
              style={{
                margin: '0 35px',
              }}
            />
            <Select allowClear={true} style={{width: 200, margin: 10}} size={"large"} defaultValue="点击开设新专科"
                    onChange={this.handleChange}>
              {allSpecials.map(special => {
                return (
                  <Select.Option key={special.key} disabled={special.disable}
                                 value={special.name}>{special.name}</Select.Option>
                )
              })}
            </Select>

            <Button onClick={this.AddSpecial} style={{margin: 10}} type={"primary"}>确定</Button>
          </Row>
        </PageHeader>

        <Table dataSource={this.state.specials} pagination={{defaultPageSize: 5}} columns={columns}/>

      </div>

    );

  }
}

export default HospitalSpecial;
