import React, {Component} from 'react';
import {Button, Card, Col, Image, Row, message,Divider, Empty, Modal, Form, Input, Upload} from 'antd';
import {addOutPatient, getOutPaitentsBySepcId} from "@/pages/SpecialList/service";
import {history} from 'umi'
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const style = {background: '#0092ff', padding: '8px 0'};
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

class OutPaitents extends Component {

  state = {
    OutPaitents: [],
    isAddTableShow: false,
    loading: false,
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  constructor(props) {
    super(props);
   this.addForm = React.createRef();
  }

  componentDidMount() {
    let outPaitentsBySepcId = getOutPaitentsBySepcId(this.props.match.params[0]);
    outPaitentsBySepcId.then(res => {
      res.forEach(e => {
        e.key = e.id;
      })
      this.setState({OutPaitents: res})
      console.log(res);
    }).catch((reason => (
      this.setState({})
    )))

  }

  handleAddOk = async () => {
    let fileds = await this.addForm.current.validateFields();
    console.log(fileds);
    fileds.special_id=this.props.match.params[0];
    let NewSpecial={"image":fileds.image.file.response,name:fileds.name,special_id:fileds.special_id};
    console.log(NewSpecial);
    addOutPatient(NewSpecial).then((success)=>{
      message.success("添加成功");
    });
    let outPaitentsBySepcId = getOutPaitentsBySepcId(this.props.match.params[0]);
    outPaitentsBySepcId.then(res => {
      res.forEach(e => {
        e.key = e.id;
      })
      this.setState({OutPaitents: res,isAddTableShow: false})
      console.log(res);
    }).catch((reason => (
      this.setState({isAddTableShow: false})
    )))



  }
  handleAddCancel = () => {
    this.setState({isAddTableShow:false});
  }

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const OutPatients = this.state.OutPaitents;

    if (OutPatients.length === 0) {
      return (
        <Empty className="emptyIndex"
               image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
               imageStyle={{
                 height: 260,
               }}
               description={
                 <span>
        该专科下暂无门诊
      </span>
               }
        >
          <Button type="primary" onClick={}>立即添加</Button>
        </Empty>
      );
    } else return (


      <div>

        <Button onClick={event => history.goBack()}>返回上一层</Button>

        <Row gutter={[16, 24]}>


          {
            OutPatients.map((e) => {
              return (
                <Col className="gutter-row" span={6} key={e.id}>
                  <Card cover={<img style={{padding: 20}} alt="example"
                                    src={e.image==null?"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1190152690,415337543&fm=26&gp=0.jpg":e.image}/>}
                        title="" extra={<a href="#">查看相应医院</a>} style={{width: 200}}>
                    <p style={{textAlign: "center"}}>{e.name}</p>
                  </Card>
                  <br/>
                </Col>
              )
            })

          }


          <Col className="gutter-row" span={6}>
            <Card hoverable onClick={event => {
              this.setState({isAddTableShow:true})
            }} cover={<PlusOutlined style={{height: 150, color: 'gray', fontSize: 100}}/>}
                  title="" style={{width: 200, height: 200}}>
              <p>新增门诊</p>
            </Card>

          </Col>
        </Row>

        <Modal
          title="新增门诊"
          visible={this.state.isAddTableShow}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          forceRender={true}
        >
          <Form  {...layout}
                 ref={this.addForm}
          >
            <Form.Item name='name' label="门诊名称" rules={[{required: true}]}>
              <Input/>
            </Form.Item>

            <Form.Item   name='image' label="门诊图片" rules={[{required: false}]} >
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://192.168.192.133:8182/upload/image"
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>

          </Form>
        </Modal>
      </div>

    );
  }
}

export default OutPaitents;
