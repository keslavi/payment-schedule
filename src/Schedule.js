import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import {
    Field,
    reduxForm,
} from 'redux-form';
import { getSchedule, selectSchedule } from './store/actions/schedule-action';
import _ from 'lodash';

import {
    colField,
    select,
    currencyMask,
} from './helpers/redux-form-helpers'

import {
    Button
    , Form
    , FormGroup
    , Row
    , Col
    , Card
    , CardBody
    , Label
} from 'reactstrap';

import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
momentLocalizer(moment);

class Schedule extends Component {
    handleChange(values) { console.log(values); }
    componentDidMount() { }

    onSubmit(values) {
        const rates = this.props.state.schedule.lookup.rates;
        values.rate = rates.find(x => (x.range.min <= values.amt && values.amt <= x.range.max)).key;

        this.props.getSchedule(values);
        //toast.success('Saved Contract');
    }

    onSelect(values) {
        const schedule = JSON.parse(JSON.stringify(this.props.state.schedule));
        values.amt = schedule.amt;
        values.rate = this.props.state.schedule.lookup.rates
            .find(x => (x.range.min <= values.amt && values.amt <= x.range.max));

        this.props.selectSchedule(values);
    }

    renderSchedules(schedule, selected) {
        const items = schedule.schedules;
        if (_.isEmpty(items)) {
            return (<div></div>)
        }

        const subtext = {
            fontSize: '60%',
            fontStyle: 'italic'
        }
        const showAll = items.length > 12;
        const amt = this.props.state.schedule.amt;
        const rate = this.props.state.schedule.lookup.rates
            .find(x => (x.range.min <= amt && amt <= x.range.max));

        if (!showAll) {
            return (
                <Card><CardBody>
                    Interest Rate: {rate.apr}
                    <table id='elSchedules' className="table table-hover table-condensed f11 table-nowrap">
                        <thead>
                            <tr>
                                <th className='text-center'>Months<br />&nbsp;</th>
                                <th className='text-right'>Payment<br />&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(x => {
                                    return (
                                        <tr key={x.id} onClick={() => this.onSelect(x)}>
                                            <td className='text-center'>{x.id}</td>
                                            <td className='text-right'>{x.payment}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <p style={subtext}>
                        *APR=Annual Percentage Rate
                    </p>
                </CardBody></Card>
            );
        }

        return (
            <Card><CardBody>
                Amount: <b>${schedule.amt}</b> Interest Rate: {rate.apr}
                <table id='elSchedules' className="table table-hover table-condensed f11 table-nowrap">
                    <thead>
                        <tr>
                            <th className='text-center'>Months<br />&nbsp;</th>
                            <th className='text-right'>Payment<br />&nbsp;(First 12)</th>
                            <th className='text-right'>Payment<br />(after 12)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(x => {
                                return (
                                    <tr key={x.id} onClick={() => this.onSelect(x)}>
                                        <td className='text-center'>{x.id}</td>
                                        <td className='text-right'>{x.payment}</td>
                                        <td className='text-right'>{x.payment2 ? x.payment2 : ''}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <p style={subtext}>
                    *APR=Annual Percentage Rate
                </p>
            </CardBody></Card>
        );
    }

    renderSelected(item) {
        if (!item) return <span></span>
        const subtext = {
            fontSize: '60%',
            fontStyle: 'italic'
        }

        return (
            <Card>
                <CardBody>
                    <h5>Selected Plan:</h5>
                    <br /><b>${item.amt.toMoney()}</b> borrowed at <b>{item.rate.apr}</b>
                    <br />for <b>{item.time}</b> Months, with a monthly payment**
                    <br />of <b>${item.payment}</b> per month
                    {!item.payment2 && <span>.</span>}
                    {item.payment2 && <span>
                        &nbsp;for the first 12 months <br /> and <b>${item.payment2} </b> for the next {item.time - 12} month(s).
                    </span>}
                    <br />&nbsp;
                    <br />&nbsp;
                    <p style={subtext}>
                        *APR=Annual Percentage Rate
                        <br/>**Monthly payment due every 30 days
                    </p>
                </CardBody>
            </Card>
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
        const item = this.props.state.schedule;
        const lookup = item.lookup;
        const selected = this.props.state.schedule.selected;
        const noPrint = _.isEmpty(selected) ? '' : 'no-print';
        const style = {
            fontSize: "1.2em"
        }

        if (_.isEmpty(item)) return (<div>loading...1</div>);
        if (_.isEmpty(lookup)) return (<div>loading...2</div>);

        return (
            <span>
                &nbsp;<br />
                <h1 className='text-center'>Suggested Payment Guide</h1>
                <Form className='no-print'
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}
                >
                    <Card className={noPrint}>
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
                                    name='range'
                                    label='Months'
                                    lookup={item.lookup.ranges}
                                    component={select}
                                    xs='3'
                                />
                                <Col>
                                    <FormGroup className='submit'>
                                        <Label>&nbsp;</Label>
                                        <div>
                                            <Button color='primary no-print'>Submit</Button>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Form>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }} style={style}>
                        {this.renderSelected(selected)}
                        <span className={noPrint}>
                            {this.renderSchedules(item, selected)}
                        </span>
                    </Col>
                </Row>
            </span>
        )
    }
}




function validate(values) { }

function mapStateToProps(state, ownProps) {
    return {
        state,
        initialValues: {
            amt: 0,
            rate: 10,
            range: 12,
        }
    };
}


export default connect(mapStateToProps, { getSchedule, selectSchedule })(
    reduxForm({
        form: 'frmSchedule',
        enableReinitialize: true,
        validate
    })(Schedule)
)
