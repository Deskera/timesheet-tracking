import React from 'react'
// import Input from './Input'
// import Textarea from './Textarea'
// import Select from './Select'
// import RadioButtons from './RadioButtons'
// import CheckboxGroup from './CheckboxGroup'
// import DatePicker from './DatePicker'
// import ChakraInput from './ChakraInput'

import InputText from './InputText';
import PhoneNumber from './PhoneNumber';
import RadioButtons from './RadioButtons';
import Select from './Select';
import DatePicker from './DataPicker';

function FormikControl(props) {
    const { control, ...rest } = props;
    switch (control) {
        case 'inputText':
            return <InputText {...rest} />
        case 'phoneNumber':
            return <PhoneNumber {...rest} />
        case 'select':
          return <Select {...rest} />
        case 'radio':
          return <RadioButtons {...rest} />
        case 'date':
          return <DatePicker {...rest} />
        default:
          return null
    }
}

export default FormikControl