import { Button, Col, Descriptions, Form, Input, Radio, Row } from "antd";
import { calcVRPRO } from "api/calc";
import Polar from "components/Chart/Polar";
import Result from "components/Result";
import Tip from "components/Tip";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function VRPRO() {
    const [form] = Form.useForm();
    const width = useSelector((state) => state.browser.width);
    const intl = useIntl();
    const [result, setResult] = useState({
        visible: false,
        output: null,
        input: null,
        error: null,
    });
    const [chartType, setChartType] = useState("single");

    const layout = {
        xs: 24,
        sm: 12,
    };

    const formLayout = {
        labelCol: {
            sm: 10,
        },
        wrapperCol: {
            sm: 14,
        },
    };

    function calculate(values) {
        calcVRPRO
            .send(values)
            .then((data) => {
                setResult({ visible: true, output: data, input: values });
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function close() {
        setResult({ visible: false, output: null, input: null, error: null });
    }

    function handleReset() {
        form.resetFields();
    }

    return (
        <React.Fragment>
            <Tip method="vrpro" />
            <div className="calculate-wrapper">
                <Form form={form} {...formLayout} onFinish={calculate} className="calculate-form">
                    <Row gutter={24}>
                        <Col {...layout}>
                            <Form.Item
                                label="Optic Zone"
                                name="opicZone"
                                rules={[{ required: true }]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col {...layout}>
                            <Form.Item label="C7" name="c7" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C8" name="c8" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C11" name="c11" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C12" name="c12" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col {...layout}>
                            <Form.Item label="C13" name="c13" rules={[{ required: true }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
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
                            <Form.Item
                                label="Mani Cyl Axis"
                                name="maniCylAxis"
                                rules={[{ required: true }]}
                            >
                                <Input autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        wrapperCol={{
                            sm: { span: 19, offset: 5 },
                        }}
                    >
                        <Button className="calculate-btn" type="primary" htmlType="submit">
                            {intl.formatMessage({ id: "btn.calc" })}
                        </Button>
                        <Button className="calculate-btn" onClick={handleReset}>
                            {intl.formatMessage({ id: "btn.clear" })}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Result visible={result.visible} onClose={close}>
                {result.input && (
                    <Descriptions
                        size="small"
                        bordered
                        colon={false}
                        column={3}
                        title={intl.formatMessage({ id: "text.input" })}
                        layout="vertical"
                    >
                        <Descriptions.Item label="Opic Zone">
                            {result.input.opicZone}
                        </Descriptions.Item>
                        <Descriptions.Item label="C7">{result.input.c7}</Descriptions.Item>
                        <Descriptions.Item label="C8">{result.input.c8}</Descriptions.Item>
                        <Descriptions.Item label="C11">{result.input.c11}</Descriptions.Item>
                        <Descriptions.Item label="C12">{result.input.c12}</Descriptions.Item>
                        <Descriptions.Item label="C13">{result.input.c13}</Descriptions.Item>
                        <Descriptions.Item label="Mani Sph">
                            {result.input.maniSph}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mani Cyl">
                            {result.input.maniCyl}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mani Cyl Axis">
                            {result.input.maniCylAxis}
                        </Descriptions.Item>
                    </Descriptions>
                )}
                {result.output && (
                    <Descriptions
                        size="small"
                        bordered
                        colon={false}
                        column={3}
                        title={intl.formatMessage({ id: "text.output" })}
                        layout="vertical"
                    >
                        <Descriptions.Item label="Correct Sph">
                            {result.output.correctSph}
                        </Descriptions.Item>
                        <Descriptions.Item label="Correct Cyl">
                            {result.output.correctCyl}
                        </Descriptions.Item>
                        <Descriptions.Item label="Correct Axis">
                            {result.output.correctCylAxis}
                        </Descriptions.Item>
                    </Descriptions>
                )}
                <div>
                    <Radio.Group
                        options={[
                            { label: intl.formatMessage({ id: "btn.single" }), value: "single" },
                            { label: intl.formatMessage({ id: "btn.double" }), value: "double" },
                        ]}
                        onChange={(e) => setChartType(e.target.value)}
                        value={chartType}
                        optionType="button"
                    />
                </div>
                <div>
                    <Polar
                        type={chartType}
                        data={
                            result.input && result.output
                                ? [
                                      [+result.output.maniCyl, +result.output.maniAxis, "Mani"],
                                      [+result.output.comaCyl, +result.output.comaAxis, "COMA"],
                                      [+result.output.c11Cyl, 135, "C11"],
                                      [+result.output.c13Cyl, 90, "C13"],
                                      [result.output.vrCyl, result.output.vrAxis, "VR"],
                                  ]
                                : []
                        }
                        width={width < 576 ? 320 : 400}
                        height={width < 576 ? 320 : 400}
                    />
                </div>
            </Result>
        </React.Fragment>
    );
}