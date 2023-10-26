import { FC } from 'react';
import { calendarListStyle, IDay } from '../../types/type';
type local = 'fa' | 'en';
type type = 'single' | 'range' | 'multi';
interface IWrapper {
    onChange: (date: any) => void;
    type: type;
    withTime?: boolean;
    local: local;
    showWeekend: boolean;
    todayBtn: boolean;
    NextBtnIcon?: any;
    PreviousBtnIcon?: any;
    clockFromLabel?: string;
    clockToLabel?: string;
    clockLabel?: string;
    nextMonthBtnTitle?: string;
    previousMonthBtnTitle?: string;
    headerClass?: string;
    daysClass?: string;
    timeClass?: string;
    monthsClass?: string;
    yearsClass?: string;
    disabledDates?: IDay[];
    initCalender?: IDay;
    isComponentVisible?: boolean;
    yearListStyle?: calendarListStyle;
    handelComponentVisible?: (foreClose?: boolean) => void;
    autoClose?: boolean;
}
export declare const Wrapper: FC<IWrapper>;
export {};
