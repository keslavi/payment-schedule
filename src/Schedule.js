import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { getScheduleDet } from './helpers/paymentCalculator';
//import { Link, withRouter } from 'react-router-dom';
//import { toast } from 'react-toastify';
//import _ from 'lodash';
import {
    Field,
    reduxForm,
    //formValueSelector, 
    getFormValues
} from 'redux-form';
import { getSchedule } from './store/actions/schedule-action';
import _ from 'lodash';

import {
    colField,
    select,
    currencyMask,
} from './helpers/redux-form-helpers'
// import {
//     renderDate,
//     renderDateTime,
//     select,
//     renderColField,
//     readOnlyCol,
//     readOnlySelect,
//     currencyMask,
// } from '../_helpers/redux-form-helpers';

import {
    Button
    , Form
    , FormGroup
    , Row
    , Col
    , Card
    , CardBody
    , CardHeader
    , Label
} from 'reactstrap';

import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
momentLocalizer(moment);


class Schedule extends Component {
    handleChange(values) {
        console.log(values);
    }

    calculatePayment = (item) => {
        // const { change } = this.props;
        // const vals = this.props.formValues;

        // const pmt = getScheduleDet(vals.amtLoan, vals.payments);

        // change('amountToRedeem', pmt.redeem);
        // change('financeCharge', pmt.financeCharge)
    }

    componentDidMount() {
        // const id = this.props.idContract;
        // this.props.getContract(id);
    }


    onSubmit(values) {
        this.props.getSchedule(values);
        //toast.success('Saved Contract');
    }

    renderSchedules(items) {
        const showAll = items.length > 12;
        // var ret= _.map(items, item=>{


        // });   
        if (_.isEmpty(items)) {
            return (<div>...</div>)
        }
        if (!showAll) {
            return (
                <Row>
                    <Col xs='6'>
                        <table id='elSchedules' className="table table-hover table-bordered table-condensed f11 table-nowrap">
                            <thead>
                                <tr>
                                    <th className='text-right'>Months<br />&nbsp;</th>
                                    <th className='text-right'>Payment<br />&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(x=>{
                                        return (
                                            <tr key={x.id}>
                                                <td>{x.id}</td>
                                                <td>{x.payment}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td className='text-right'>a</td>
                                    <td className='text-right'>b</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            );
        }

        return (
            <Row>
                <Col xs='6'>
                    <table id='elSchedules' className="table table-hover table-bordered table-condensed f11 table-nowrap">
                        <thead>
                            <tr>
                                <th className='text-right'>Months<br />&nbsp;</th>
                                <th className='text-right'>Payment<br />&nbsp;(First 12)</th>
                                <th className='text-right'>Payment<br />(after 12)</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    items.map(x=>{
                                        return (
                                            <tr key={x.id}>
                                                <td>{x.id}</td>
                                                <td>{x.payment}</td>
                                                <td>{x.payment2 ? x.payment2:''}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td className='text-right'>a</td>
                                    <td className='text-right'>b</td>
                                </tr>
                            </tbody>
                    </table>
                </Col>
            </Row>
        );
    }

    render() {
        const {
            //handleChange, 
            handleSubmit,
            // change, 
            // values 
        } = this.props;//, pristine, reset, submitting}=this.props;
        //const formValues = this.props.formValues;
        const item = this.props.state.schedule || this.props.state.schedules;
        const lookup = item.lookup;

        if (_.isEmpty(item)) return (<div>loading...1</div>);
        if (_.isEmpty(lookup)) return (<div>loading...2</div>);

        // if (!item) {
        //     return <span>loading...</span>;
        // }

        return (
            <span>
                <br />
                <h1>Suggested Payment Guide</h1>
                <Form
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}
                >
                    <Card>
                        <CardHeader>Loan Information</CardHeader>
                        <CardBody>
                            <Row>
                                <Field
                                    name='amt'
                                    label='Amount'
                                    placeholder='Amount'
                                    component={colField}
                                    {...currencyMask}
                                />
                                <Field
                                    name='rate'
                                    label='Rate'
                                    lookup={item.lookup.rates}
                                    component={select}
                                    xs='3'
                                />
                                <Field
                                    name='range'
                                    label='Months'
                                    lookup={item.lookup.ranges}
                                    component={select}
                                    xs='3'
                                />
                                <Col>
                                    <FormGroup className='submit'>
                                        <Label>&nbsp;.</Label>
                                        <div>
                                            <Button color='primary'>Submit</Button>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>
                {this.renderSchedules(item.schedules)}
            </span>
        )
    }
}




function validate(values) { }

function mapStateToProps(state, ownProps) {
    //console.log (getFormValues('frmSchedule')(state) );
    // const formValues = getFormValues('frmSchedule')(state) || {
    //     principle: +500,
    //     rate: +25,
    //     range: +12
    // }
    //console.log('formvalues: ', formValues);
    return {
        state
    };
}


export default connect(mapStateToProps, { getSchedule })(
    reduxForm({
        form: 'frmSchedule',
        enableReinitialize: true,
        validate
    })(Schedule)
)
