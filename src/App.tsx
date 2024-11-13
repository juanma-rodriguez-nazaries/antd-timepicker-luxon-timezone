import { useState } from 'react'
import './App.css'
import { App as AntdApp, Col, ConfigProvider, Row, Form, Button } from "antd";
import LuxonDatePickerComponent from "./components/luxon-date-picker.component.tsx";
import { DateTime } from "luxon";
import { useForm, SubmitHandler } from "react-hook-form";

function App() {
    const [ typeDateTime, setTypeDateTime ] = useState<null | DateTime>(null);
    const [ uiDateTime, setUiDateTime ] = useState<null | DateTime>(null);

    interface FormValues {
        typeDateTime: DateTime | null;
        uiDateTime: DateTime | null;
    }

    const { handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            typeDateTime: null,
            uiDateTime: null,
        },
        resolver: (values) => {
            console.log("Form resolver validation:", values.typeDateTime?.toISO(), values.uiDateTime?.toISO());
            return {
                values,
                errors: {},
            };
        },
    });
    const onSubmit: SubmitHandler<FormValues>= (data: FormValues) => {

        setTypeDateTime(data.typeDateTime);
        setUiDateTime(data.uiDateTime);
        console.log(data.typeDateTime?.toISO(), data.uiDateTime?.toISO());
    };

    return (
        <ConfigProvider>
            <AntdApp>
                <Form onFinish={handleSubmit(onSubmit)}>
                    <h1>Input Typing (Local TZ) / Input Select (Luxon Settings TZ) </h1>
                    <Row gutter={16} justify={"center"}>
                        <Col span={"auto"}>
                            <label>Typing time</label>
                            <Col span={24}>
                                <Form.Item name={"typeDateTime"} >
                                    <LuxonDatePickerComponent
                                        picker={"time"}
                                        format={"HH:mm"}
                                        onChange={(value) => {
                                            console.log("OnChange - Manual Type - ", value.toISO(), value.zoneName);
                                            setValue("typeDateTime", value);
                                        }}
                                        onCalendarChange={(date) => {
                                            if (date instanceof Array) {
                                                console.log("onCalendarChange - Manual Type - ", date);
                                            } else {
                                                console.log("onCalendarChange - Manual Type - ", date.toISO(), date.zoneName)
                                            }
                                        }}

                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <p>Iso Time: {typeDateTime?.toISO()}</p>
                                <p>Timezone: {typeDateTime?.zoneName}</p>
                            </Col>
                        </Col>
                        <Col span={"auto"}>
                            <label>Select Dropdown</label>
                            <Col span={24}>
                                <Form.Item name={"uiDateTime"} >
                                    <LuxonDatePickerComponent
                                        picker={"time"}
                                        format={"HH:mm"}
                                        onChange={(value) => {
                                            console.log("OnChange - UI Select - ", value.toISO(), value.zoneName)
                                            setValue("uiDateTime", value)
                                        }}
                                        onCalendarChange={(date) => {
                                            if (date instanceof Array) {
                                                console.log("OnCalendarChange - UI Select - ", date);
                                            } else {
                                                console.log("OnCalendarChange - UI Select - ", date.toISO(), date.zoneName)
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <p>Iso Time: {uiDateTime?.toISOTime()}</p>
                                <p>Timezone: {uiDateTime?.zoneName}</p>
                            </Col>
                            <Col span={24}>
                                <Button htmlType={"submit"}>Submit</Button>
                            </Col>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col span={"auto"}>
                            {typeDateTime && uiDateTime ?
                                typeDateTime?.zoneName === uiDateTime?.zoneName ? <h1 style={{ color: "green" }}>Same tz</h1> :
                                    <h1 style={{ color: "red" }}>Different tz</h1> : <h1 style={{color: "orange"}}>Fill both fields</h1>
                            }
                        </Col>
                    </Row>
                </Form>
            </AntdApp>
        </ConfigProvider>
    )
}

export default App
