# Ant Design TimePicker with Luxon Timezone
## React + TypeScript + Vite
Using both Ant Design TimePicker and Luxon Timezone to create a TimePicker that can handle timezones.
The objective of this issue is to find a workaround to a known issue with Ant Design TimePicker and Luxon Timezone.

## Issue History
When using keyboard typing input on the Ant Design TimePicker, the timezone is set from locale time.
When using the mouse and selecting the time from the dropdown, the timezone is set from the Luxon config.

### **Update**
After updating the antd, rc-picker and luxon versions, the issue is still present, but it's reversed.
Now, when using keyboard typing input on the Ant Design TimePicker, the timezone is set from the Luxon config.
When using the mouse and selecting the time from the dropdown, the timezone is set from locale time.

## Goal
The goal is to have the TimePicker always set the timezone from the Luxon config, regardless of the input method.

## Workaround
The workaround is to use the `getNow` function on the settings wrapper to force the instantiation of the DateTime value
using the Luxon config and use the `parse` function to set the value on the TimePicker also when the input is changed from the keyboard.

### Comment
The workaround is not ideal, but it works for now. The issue is still open, and the goal is to find a better solution.
We would like the wrapper to have a consistent behavior regardless of the input method and if the Luxon config is set,
to use it regardless of the input method.

## Steps to Reproduce
1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm run dev`
4. Open the browser and go to `http://localhost:5173/`
5. Open the console and check the logs
6. Try to change the first time input using the keyboard and press Tab to jump to the next input
7. Try to change the second time input using the mouse and select the time from the dropdown and press OK
8. Check the logs and see the difference in the timezone set (submit is optional)

#### Logs sample
```
parse 2024-11-13T14:14:00.000-05:00
luxon-date-picker.component.tsx?t=1731512569067:13 defaultParse 2024-11-13T14:14:00.000+01:00
onCalendarChange - Manual Type -  2024-11-13T14:14:00.000-05:00 America/New_York
OnChange - Manual Type -  2024-11-13T14:14:00.000-05:00 America/New_York
OnCalendarChange - UI Select -  2024-11-13T01:00:00.000+01:00 Europe/Madrid
OnCalendarChange - UI Select -  2024-11-13T01:04:00.000+01:00 Europe/Madrid
OnChange - UI Select -  2024-11-13T01:04:00.000+01:00 Europe/Madrid
```
