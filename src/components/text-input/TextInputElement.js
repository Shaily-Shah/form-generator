import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import './TextInputElement.scss'
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';

function TextInputElement(props) {
    const [data, setData] = useState([
        { label: 'Input Text', type: "text", placeholder: 'Enter some text', value: '' },
        { label: 'Number', type: "number", placeholder: 'Enter some number', value: '' },
        { label: 'Password', type: "password", placeholder: 'Enter password', value: '' },
        { label: 'Textarea', type: "textarea", placeholder: 'Enter some text', value: '' },
        { label: 'Checkbox', type: "checkbox", placeholder: '', value: '' },
        { label: 'Radio', type: "radio", placeholder: '', value: '' },

    ])
    useEffect(() => {
        console.log(props)
        if (props.data)
            setData(props.data)
    }, [props.data])


    const getFormData = (e, i) => {
        props.sendFormData(e, i, 'add')
    }
    const removeFormData = (e, i) => {
        props.sendFormData(e, i, 'remove')
    }
    const updateData = (i, e, action) => {
        if (action == 'label')
            props.sendFormData(e.target.value, i, 'updateLabel')
        else
            props.sendFormData(e.target.value, i, 'updateValue')
    }

    return (
        <>
            <Container fluid>
                {data.map((val, i) => (
                    <div key={i}>
                        <Form.Group className="mb-3" id={i} controlId={val.label + i}>
                            <Col className='mb-2' sm="10" >
                                <input className='border-0' onChange={(e) => updateData(i, e, 'label')} type="text" readOnly={!props.editable} value={val.label} />
                            </Col>
                            <Col sm="10" className='d-flex align-items-center'>
                                {val.type == 'textarea' ?
                                    <Form.Control as={val.type} onChange={(e) => updateData(i, e, 'value')} value={val.value} placeholder={val.placeholder} />
                                    :
                                    val.type == 'checkbox' || val.type == 'radio' ?
                                        <Form.Check type={val.type} name={val.type+i} id={i}/>
                                        :
                                        <Form.Control type={val.type} onChange={(e) => updateData(i, e, 'value')} value={val.value} placeholder={val.placeholder} />
                                }
                                {!props.editable ?
                                    <PlusCircle className='ms-2' size={20} onClick={() => getFormData(val, i)} />
                                    :
                                    <DashCircle className='ms-2' size={20} onClick={() => removeFormData(val, i)} />
                                }
                            </Col>


                        </Form.Group>
                    </div>
                ))}


            </Container>
        </>
    )
}

export default TextInputElement;