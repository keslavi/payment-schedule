import { getScheduleSum } from '../../helpers/schedules-generator';

export const ScheduleActions = {
    GET_SCHEDULE : 'Get Schedule'
}

const a = ScheduleActions;

export function getSchedule(values) { 

    const payload= getScheduleSum(values.amt, values.rate, values.range);

    return {
        type: a.GET_SCHEDULE,
        payload
    }
}