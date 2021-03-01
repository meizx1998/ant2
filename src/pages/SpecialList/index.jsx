import React, {Component} from 'react';
import {
  addHospital,
  addSpecialList,
  deletehospital, deleteSpecialList,
  getHospitalList,
  getSpecialList,
  updateHospitai,
  updateSpecialList
}
from "./service";
import {Button, Form, Input, message, Modal, Popconfirm, Select, Space, Table} from "antd";
import SmileOutlined from "@ant-design/icons/SmileOutlined";
import {CompassOutlined, PhoneOutlined} from "@ant-design/icons";
const {Option} = Select;

import {history} from 'umi'
const {Search} = Input;
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

class SpecialList extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.editForm = React.createRef();
  }


  state = {
    specialList: [],
    ModalShow: false,
    isModifyModalShow: false,
    isModifying: {},
  }

  componentDidMount() {
    let sepcialList = getSpecialList('');
    sepcialList.then((res) => {
      res.items.forEach((e) => {
        e.key = e.id;
      });
      this.setState({specialList: res.items})
    })
  }

  onSearch = (e) => {
    let sepcialList = getSpecialList(e);

    sepcialList.then((res) => {
      res.items.forEach((e) => {
        e.key = e.id;
      });
      this.setState({specialList: res.items});
    })


  }

  cancelSearch = () => {
    let sepcialList= getSpecialList('');
    sepcialList.then((res) => {
      this.setState({specialList: res.items})
    })
  }
  showModal = () => {
    this.setState({ModalShow: true})
  };
  handleOk = async () => {
    const fieldsValue = await this.form.current.validateFields();
    addSpecialList(fieldsValue);
    message.success('添加成功');
    let specialList = getSpecialList('');
    specialList.then((res) => {
      res.items.forEach((e) => {
        e.key = e.id;
      });
      this.setState({specialList: res.items,ModalShow: false})

    })

  }
  handleCancel = () => {
    this.setState({ModalShow: false})
  }
  handleEditOk = async () => {
    let validateFields = await this.editForm.current.validateFields();
    validateFields.id = this.state.isModifying.id;
    validateFields.key = this.state.isModifying.id;
    updateSpecialList(validateFields);
    let map = this.state.specialList.map((h) => {
      if (h.id === validateFields.id) {
        h = validateFields;
      }
      return h;
    });
    message.success("修改成功")
    this.setState({isModifyModalShow: false, specialList: map})
  }
  handleEditCancel = () => {
    this.setState({isModifyModalShow: false})
  }
  editSpecial= (speical) => {
  }

  deleteSpecial= (speical) => {
    console.log(speical);
  }
  confirm = (e) => {
    deleteSpecialList(e).then(r => {
      message.success('删除成功');
      let newSpeicalList = this.state.specialList.filter((h) => {
        return h.id !== e;
      });
      this.setState({specialList: newSpeicalList})

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
        title: '专科名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '专科描述',
        dataIndex: 'des',
        key: 'des',
      },
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
           <Button onClick={event => { history.push(`/SpecialList/OutPaitents/${record.id}`)}}>查看所有门诊</Button>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <div><Search allowClear={true} placeholder="搜索专科名字" onSearch={this.onSearch}
                     style={{width: 400}}/>
          <Button type='default' onClick={this.cancelSearch}>
            返回全部专科
          </Button>
          <Button type='default' onClick={this.showModal}>
            添加专科
          </Button>
          <Modal

            title="新增专科信息"
            visible={this.state.ModalShow}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form  {...layout}
                   ref={this.form}
            >
              <Form.Item name='name' label="专科名称" rules={[{required: true}]}>
                <Input/>
              </Form.Item>
              <Form.Item name='des' label="专科描述" rules={[ {required: true}]}>
                <Input />
              </Form.Item>

            </Form>
          </Modal>
          <Modal
            title="修改专科信息"
            visible={this.state.isModifyModalShow}
            onOk={this.handleEditOk}
            onCancel={this.handleEditCancel}
            forceRender={true}
          >
            <Form  {...layout}
                   ref={this.editForm}
                   initialValues={this.state.isModifying}
            >
              <Form.Item name='name' label="专科名称" rules={[{required: true}]}>
                <Input/>
              </Form.Item>

              <Form.Item name='des' label="专科描述" rules={[{required: true}]}>
                <Input />
              </Form.Item>

            </Form>
          </Modal>
        </div>

        <hr/>
        <Table dataSource={this.state.specialList} columns={columns}/>
      </div>
    );


  }

}

export default SpecialList;
