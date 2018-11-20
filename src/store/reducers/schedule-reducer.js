
import { ScheduleActions as a } from '../actions/schedule-action';
import { getScheduleSum } from '../../helpers/schedules-generator';

//getScheduleSum(2000, 10, 13),
const initState = {
    amt: 500,
    rate: 12.5,
    range: 12,
    schedules: [],
    lookup: {
        rates: [
            {
                key: +12.5,
                value: '12.5'
            },
            {
                key: +10,
                value: '10'
            }
        ],
        ranges: [
            {
                key: +12,
                value: '12 months'
            },
            {
                key: +18,
                value: '18 months'
            }
        ]
    }

};

export default function (state = initState, action) {
    switch (action.type) {
        case a.GET_SCHEDULE:
            let payload = action.payload;
            payload.lookup = state.lookup;
            return payload;
        default:
            return state;
    }
}
