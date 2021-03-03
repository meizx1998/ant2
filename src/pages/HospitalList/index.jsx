import React, {Component} from 'react';
import {Table, Input, Button, Modal, Form, Select, message, Tag, Space, Popconfirm} from 'antd';
import {getHospitalList, addHospital, deletehospital, updateHospitai} from "@/pages/HospitalList/service";
import {CompassOutlined, PhoneOutlined} from "@ant-design/icons";
import SmileOutlined from "@ant-design/icons/SmileOutlined";
import {history} from "@/.umi/core/history";


const {Option} = Select;
const {Search} = Input;
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

class HospItalList extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.editForm = React.createRef();
  }


  state = {
    hospitals: [],
    ModalShow: false,
    isModifyModalShow: false,
    isModifying: {},
  }

  componentDidMount() {
    let hospitalList = getHospitalList('');
    hospitalList.then((res) => {
      res.items.forEach((e) => {
        e.key = e.id;
      });
      this.setState({hospitals: res.items})
      console.log(res.items);
    })
  }

  onSearch = (e) => {
    console.log(e);
    let hospitalList = getHospitalList(e);

    hospitalList.then((res) => {
      res.items.forEach((e) => {
        console.log(e);
        e.key = e.id;
      });

      this.setState({hospitals: res.items});
    })


  }

  cancelSearch = () => {
    let hospitalList = getHospitalList('');
    hospitalList.then((res) => {
      this.setState({hospitals: res.items})
      console.log(res.items);
    })
  }
  showModal = () => {
    this.setState({ModalShow: true})
  };
  handleOk = async () => {
    const fieldsValue = await this.form.current.validateFields();
    addHospital(fieldsValue);
    message.success('添加成功');
    let hospitalList = getHospitalList('');
    hospitalList.then((res) => {
      res.items.forEach((e) => {
        e.key = e.id;
      });
      this.setState({hospitals: res.items,ModalShow: false})

    })

  }
  handleCancel = () => {
    this.setState({ModalShow: false})
  }
  handleEditOk = async () => {
    let validateFields = await this.editForm.current.validateFields();
    console.log(this.state.isModifying);
    validateFields.id = this.state.isModifying.id;
    validateFields.key = this.state.isModifying.id;
    console.log(validateFields);
    updateHospitai(validateFields);
    let map = this.state.hospitals.map((h) => {
      if (h.id === validateFields.id) {
        h = validateFields;
      }

      return h;
    });
    message.success("修改成功")
    this.setState({isModifyModalShow: false, hospitals: map})
  }
  handleEditCancel = () => {
    this.setState({isModifyModalShow: false})
  }
  editHospital = (hospital) => {

  }

  deleteHospital = (hospital) => {
    console.log(hospital);
  }
  confirm = (e) => {
    deletehospital(e).then(r => {
      message.success('删除成功');
      let newHospitalList = this.state.hospitals.filter((h) => {
        return h.id !== e;
      });
      this.setState({hospitals: newHospitalList})

    })

  }

  cancel = (e) => {
  }

  handleEditButton = (record) => {
    this.setState({isModifyModalShow: true, isModifying: record});
    this.editForm.current.setFieldsValue(record);
  }

  render() {


    const columns = [
      {
        title: '医院名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '医院级别',
        dataIndex: 'grade',
        key: 'grade',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
      }
      ,
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={event => (this.handleEditButton(record))}>编辑 </Button>
            <Popconfirm
              title="确定删除这条数据记录吗？"
              onConfirm={(event) => this.confirm(record.id)}
              onCancel={this.cancel}
              okText="是的"
              cancelText="不是"
            >
              <Button type="primary" danger>删除</Button>
            </Popconfirm>
            <Button onClick={event => {history.push(`/Hospitallist/HospitalSpecial/${record.id}`)}}>查看医院详情</Button>

          </Space>
        ),
      },
    ];

    return (
      <div>
        <div><Search allowClear={true} placeholder="搜索医院名字" onSearch={this.onSearch}
                     style={{width: 400}}/>
          <Button type='default' onClick={this.cancelSearch}>
            返回全部医院
          </Button>
          <Button type='default' onClick={this.showModal}>
            添加医院
          </Button>
          <Modal

            title="新增医院信息"
            visible={this.state.ModalShow}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form  {...layout}
                   ref={this.form}
            >
              <Form.Item name='name' label="医院名称" rules={[{required: true}]}>
                <Input prefix={<SmileOutlined/>}/>
              </Form.Item>
              <Form.Item name='grade' label="医院级别" initialValue="二乙">
                <Select style={{width: 120}} rules={[{required: true}]}>
                  <Option value="一甲">一甲</Option>
                  <Option value="一乙">一乙</Option>
                  <Option value="一丙">一丙</Option>
                  <Option value="二甲">二甲</Option>
                  <Option value="二乙">二甲</Option>
                  <Option value="二丙">二甲</Option>
                  <Option value="三甲">三甲</Option>
                  <Option value="三乙">三乙</Option>
                  <Option value="三丙">三丙</Option>

                </Select>
              </Form.Item>
              <Form.Item name='phone' label="联系电话" rules={[{
                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                message: '请输入正确的手机号'
              }, {required: true}]}>
                <Input prefix={<PhoneOutlined/>}/>
              </Form.Item>
              <Form.Item name='address' label="地址" rules={[{required: true, type: "string"}]}>
                <Input prefix={<CompassOutlined/>}/>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="修改医院信息"
            visible={this.state.isModifyModalShow}
            onOk={this.handleEditOk}
            onCancel={this.handleEditCancel}
            forceRender={true}
          >
            <Form  {...layout}
                   ref={this.editForm}
                   initialValues={this.state.isModifying}
            >
              <Form.Item name='name' label="医院名称" rules={[{required: true}]}>
                <Input prefix={<SmileOutlined/>}/>
              </Form.Item>
              <Form.Item name='grade' label="医院级别">
                <Select style={{width: 120}} rules={[{required: true}]}>
                  <Option value="一甲">一甲</Option>
                  <Option value="一乙">一乙</Option>
                  <Option value="一丙">一丙</Option>
                  <Option value="二甲">二甲</Option>
                  <Option value="二乙">二甲</Option>
                  <Option value="二丙">二甲</Option>
                  <Option value="三甲">三甲</Option>
                  <Option value="三乙">三乙</Option>
                  <Option value="三丙">三丙</Option>

                </Select>
              </Form.Item>
              <Form.Item name='phone' label="联系电话" rules={[{
                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                message: '请输入正确的手机号'
              }, {required: true}]}>
                <Input prefix={<PhoneOutlined/>}/>
              </Form.Item>
              <Form.Item name='address' label="地址" rules={[{required: true, type: "string"}]}>
                <Input prefix={<CompassOutlined/>}/>
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <hr/>
        <Table dataSource={this.state.hospitals} columns={columns}/>
      </div>
    );


  }


}

export default HospItalList;
