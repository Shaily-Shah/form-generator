import './GenerateForm.scss'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import TextInputElement from '../text-input/TextInputElement';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
const useMyContext = () => useContext(MyContext);

function GenerateForm(props) {
    const { data, setData } = useMyContext()

    const navigate = useNavigate()
    const [form, setForm] = useState(false)
    const[showData, setShowData] = useState(false)

    useEffect(()=>{
        if(data.length > 0)
            setForm(true)
    },[props.showForm || data.length>0])


    const getForm = (e, index, action) => {
        console.log(e)
        if (action == 'add') {
            setData([...data, e])
        }
        else if (action == 'updateLabel') {
            setData(prevVal => {
                const arr = [...prevVal]
                arr[index] = { ...arr[index], label: e }
                return arr
            })
        }
        else if (action == 'updateValue') {
            setData(prevVal => {
                const arr = [...prevVal]
                arr[index] = { ...arr[index], value: e }
                return arr
            })
        }
        else if (action == 'remove') {
            const newData = data.filter((item, i) => i !== index)
            setData(newData)
        }
        else {
            console.log(data)
        }
        setForm(true)

    }
    const generateForm = () => {
        console.log(data)
        navigate('/home')
        if(props.showForm){
            setShowData(true)
        }
    }

    return (
        <>



            <Container fluid className='generate-form'>
                <Row>
                    {!props.showForm && <Col xs={6}>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="input">
                            <Row>
                                <Col sm={3} className="side-nav-list p-0">
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="input">Text Input</Nav.Link>
                                        </Nav.Item>
                                       
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="input"><TextInputElement editable={false} sendFormData={getForm} /></Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Col>}
                    <Col xs={props.showForm ? 12 : 6} >
                        {form &&
                            <>
                                <h5>Sample Form</h5>

                                <div className='sample-form'>
                                    <Form className='form-data pb-5'>
                                        {data && <TextInputElement editable={!props.showForm ? true : false} data={data} sendFormData={getForm} ></TextInputElement>}
                                    </Form>
                                    <div className='text-end submit-btn col-sm-10'><Button onClick={generateForm} variant="primary">Generate Form</Button></div>
                                </div>
                            </>}
                            {showData && <div>
                                Data:
                                    {JSON.stringify(data)}
                            </div>}
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default GenerateForm;
