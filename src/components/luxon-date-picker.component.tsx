import { DatePicker } from 'antd';
import { DateTime } from 'luxon';
import luxonGenerateConfig from 'rc-picker/lib/generate/luxon';

const MyDatePicker = DatePicker.generatePicker<DateTime>({
    ...luxonGenerateConfig,
    // Uncomment to make both interactions work properly, if missing, only typing the time will work
    // getNow: () => DateTime.now(),
    locale: {
        ...luxonGenerateConfig.locale,
        parse: (locale: string, text: string, formats: string[]) => {
            console.log("parse", DateTime.fromFormat(text, formats[0], { locale }).toISO());
            console.log("defaultParse", luxonGenerateConfig.locale.parse(locale, text, formats)?.toISO());
            return DateTime.fromFormat(text, formats[0], { locale });
        },
    }
});

export default MyDatePicker;
