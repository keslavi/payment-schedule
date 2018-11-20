import React from 'react';
import {
    Col
    , FormGroup
    , Label
    , Input
} from 'reactstrap';

import { createNumberMask, createTextMask } from 'redux-form-input-masks';
//import moment from 'moment';

export const phoneMask = createTextMask({
    pattern: '(999) 999-9999',
});

export const ssnMask = createTextMask({
    pattern: '999-99-9999',
});

export const currencyMask = createNumberMask({
    prefix: '$ ',
    decimalPlaces: 2,
    locale: 'en-US',
})

export const percentageMask = createNumberMask({
    suffix: '%',
    locale: 'en-US',
})


export const colTextArea = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    const hasLabel = !(typeof field.label === 'undefined');
    const xs = field.xs || 3;
    return (
        <Col xs={xs}>
            <FormGroup className={className}>
                {hasLabel
                    ? <Label>{field.label}</Label>
                    : <span></span>
                }
                <div>
                    <textarea rows={field.rows} cols={field.cols} title={field.placeholder}
                        type="text"
                        placeholder={field.placeholder}
                        {...field.input}
                    >
                    </textarea>
                    <div>{touched ? error : ''}</div>
                </div>
            </FormGroup>
        </Col>
    )
}

export const colField = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    const hasLabel = !(typeof field.label === 'undefined');
    const xs = field.xs || 3;
    return (
        <Col xs={xs}>
            <FormGroup className={className}>
                {hasLabel
                    ? <Label>{field.label}</Label>
                    : <span></span>
                }
                <div>
                    <Input title={field.placeholder}
                        type="text"
                        placeholder={field.placeholder}
                        {...field.input}
                    />
                    <div>{touched ? error : ''}</div>
                </div>
            </FormGroup>
        </Col>
    )
}
export const readOnlyCol = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    const hasLabel = !(typeof field.label === 'undefined');
    const xs = field.xs || 3;
    return (
        <Col xs={xs}>
            <FormGroup className={className}>
                {hasLabel
                    ? <Label>{field.label}</Label>
                    : <span></span>
                }
                <div>
                    <Input title={field.placeholder}
                        type="text"
                        placeholder={field.placeholder}
                        readOnly='readonly'
                        {...field.input}
                    />
                    <div>{touched ? error : ''}</div>
                </div>
            </FormGroup>
        </Col>
    )
}


export const select = field => {
    const { meta: { touched, error } } = field;
    const className = `${touched && error ? 'has-danger' : ''}`
    const hasLabel = !(typeof field.label === 'undefined');
    const xs = field.xs || 3;

    return (
        <Col xs={xs}>
            <FormGroup className='form-group'>
                {hasLabel
                    ? <Label>{field.label}</Label>
                    : <span></span>
                }
                <div>
                    <Input
                        title={field.placeholder}
                        className={className}
                        type="select"
                        {...field.input}
                    >
                        <option key='' value=' '> </option>
                        {field.lookup.map(function (item) {
                            return (<option key={item.key} value={item.key}>{item.value}</option>)
                        })}
                    </Input>
                </div>
            </FormGroup>
        </Col>
    )
}

export const readOnlySelect = field => {
    const { meta: { touched, error } } = field;
    const className = `${touched && error ? 'has-danger' : ''}`
    const hasLabel = !(typeof field.label === 'undefined');
    const xs = field.xs || 3;

    return (
        <Col xs={xs}>
            <FormGroup className='form-group'>
                {hasLabel
                    ? <Label>{field.label}</Label>
                    : <span></span>
                }
                <div>
                    <Input
                        title={field.placeholder}
                        className={className}
                        type="select"
                        readOnly='readOnly'
                        {...field.input}
                    >
                        <option key='' value=' '> </option>
                        {field.lookup.map(function (item) {
                            return (<option key={item.key} value={item.key}>{item.value}</option>)
                        })}
                    </Input>
                </div>
            </FormGroup>
        </Col>
    )
}
