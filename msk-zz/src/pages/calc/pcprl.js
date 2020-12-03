import { Button, Col, Collapse, Form, Input, notification, Row, Select } from "antd";
import calcApi from "api/calc";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const { Panel } = Collapse;
const { Option } = Select;

const formLayout = {
    labelCol: {
        sm: { span: 10 },
    },
    wrapperCol: {
        sm: { span: 14 },
    },
};

const layout = {
    span: 12,
    xs: 24,
    sm: 12,
};

export default function pcprl() {
    const intl = useIntl();
    const [form] = Form.useForm();

    async function onSubmit() {
        try {
            const formData = await form.validateFields();
            const { data } = await calcApi("zzpcprl")(formData);
            console.log(data);
        } catch (e) {}
    }

    function onReset() {
        form.resetFields();
    }

    return [
        <h1 key="title" className="title">
            <FormattedMessage id="calc.pcprl.name" />
        </h1>,
        <Collapse
            key="collapse"
            ghost
            defaultActiveKey={["instructions", "notes", "rawdata", "pay", "content"]}
        >
            <Panel key="instructions" header={<FormattedMessage id="tip.title.instructions" />}>
                <FormattedMessage id="calc.pcprl.instructions" />
            </Panel>
            <Panel key="notes" header={<FormattedMessage id="tip.title.notes" />}>
                <FormattedMessage id="calc.pcprl.notes" />
            </Panel>
            <Panel key="content" header={<FormattedMessage id="text.input" />}>
                <Form
                    form={form}
                    {...formLayout}
                    validateMessages={{
                        required: intl.formatMessage({ id: "form.rules.required.field" }),
                    }}
                >
                    <Row gutter={24}>
                        <Col {...layout}>
                            <Form.Item label="Mani Sph" name="maniSph" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Mani Cyl" name="maniCyl" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="AC (mm)" name="ac" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="Kf" name="kf" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="CT (μm)" name="ct" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="calc-btn__wrapper">
                    <Button className="calc-btn" type="primary" onClick={onSubmit}>
                        <FormattedMessage id="btn.calc" />
                    </Button>
                    <Button className="calc-btn" onClick={onReset}>
                        <FormattedMessage id="btn.clear" />
                    </Button>
                </div>
            </Panel>
        </Collapse>,
    ];
}
