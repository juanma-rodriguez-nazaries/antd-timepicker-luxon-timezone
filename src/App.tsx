import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Col, ConfigProvider, Row } from "antd";
import enUS from "antd/es/locale/en_US";
import LuxonDatePickerComponent from "./components/luxon-date-picker.component.tsx";
import { DateTime } from "luxon";

function App() {
    const [ typeDateTime, setTypeDateTime ] = useState<null | DateTime>(null);
    const [ uiDateTime, setUiDateTime ] = useState<null | DateTime>(null);

    return (
        <ConfigProvider locale={enUS}>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Manual type (User TZ) / Using UI (Settings TZ) </h1>
            <Row gutter={16} justify={"center"}>
                <Col span={"auto"}>
                    <label>Manual type time</label>
                    <Col span={24}>
                        <LuxonDatePickerComponent picker={"time"} format={"HH:mm"} value={typeDateTime}
                                                  onChange={setTypeDateTime}/>
                    </Col>
                    <Col span={24}>
                        <p>Iso Time: {typeDateTime?.toISOTime()}</p>
                        <p>Timezone: {typeDateTime?.zoneName}</p>
                    </Col>
                </Col>
                <Col span={"auto"}>
                    <label>Use UI</label>
                    <Col span={24}>
                        <LuxonDatePickerComponent picker={"time"} format={"HH:mm"} value={uiDateTime}
                                                  onChange={setUiDateTime}/>
                    </Col>
                    <Col span={24}>
                        <p>Iso Time: {uiDateTime?.toISOTime()}</p>
                        <p>Timezone: {uiDateTime?.zoneName}</p>
                    </Col>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col span={"auto"}>
                    {typeDateTime && uiDateTime ?
                        typeDateTime?.zoneName === uiDateTime?.zoneName ? <h1 style={{ color: "green" }}>Same tz</h1> :
                            <h1 style={{ color: "red" }}>Different tz</h1> : <h1 style={{color: "yellow"}}>Fill both fields</h1>
                    }
                </Col>
            </Row>
        </ConfigProvider>
    )
}

export default App
