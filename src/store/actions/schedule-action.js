import { getScheduleSum } from '../../helpers/schedules-generator';

export const ScheduleActions = {
    GET_SCHEDULE : 'Get Schedule',
    SELECTED_SCHEDULE : 'Selected Schedule'
}

const a = ScheduleActions;

export function getSchedule(values) { 
    const payload= getScheduleSum(values.amt, values.rate, values.range);

    return {
        type: a.GET_SCHEDULE,
        payload
    }
}

export function selectSchedule(values) { 
    const payload = values;
        
    return {
        type: a.SELECTED_SCHEDULE,
        payload
    }
}