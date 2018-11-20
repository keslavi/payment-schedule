
import { ScheduleActions as a } from '../actions/schedule-action';
import { getScheduleSum } from '../../helpers/schedules-generator';


export default function (state = initState, action) {
    switch (action.type) {
        case a.GET_SCHEDULE:
            let payload = action.payload;
            payload.lookup = state.lookup;
            return payload;
        case a.SELECTED_SCHEDULE:
            const s= JSON.parse(JSON.stringify(state));
            s.selected = action.payload;
            return s;
        default:
            return state;
    }
}

const initState = {
    amt: 500,
    rate: 12.5,
    range: 12,
    schedules: [],
    lookup: {
        rates: [
            {
                key: +12.5,
                value: '12.5',
                apr: '152.083 APR*',
                range: {
                    min: +0,
                    max: +1999
                }
            },
            {
                key: +10,
                value: '10',
                apr: '121.667 APR*',
                range: {
                    min: +2000,
                    max: +2999
                }
            },
            {
                key: +8,
                value: '8',
                apr: '97.33 APR*',
                range: {
                    min: +3000,
                    max: +50000
                }
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
