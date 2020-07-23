import { Descriptions, Input } from 'antd';
import { calcTICL } from 'api/calc';
import Form from 'components/Form';
import Result from 'components/Result';
import Tip from 'components/Tip';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export default function TICL() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        calcTICL.send(values)
            .then(data => {
                setResult({ visible: true, output: data, input: values });
            })
            .catch(e => {
                console.error(e);
            });
    }

    function close() {
        setResult({ visible: false, output: null, input: null, error: null });
    }

    return <React.Fragment>
        <Tip method="ticl" />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="Mani Sph" name="maniSph" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Cyl" name="maniCyl" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Mani Cyl Axis" name="maniCylAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Resi Sph" name="resiSph" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Resi Cyl" name="resiCyl" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Resi Cyl Axis" name="resiCylAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA D" name="siaD" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="SIA Axis" name="siaAxis" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'LABEL_INPUT' })}>
                    <Descriptions.Item label="Mani Sph">{result.input.maniSph}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl">{result.input.maniCyl}</Descriptions.Item>
                    <Descriptions.Item label="Mani Cyl Axis">{result.input.maniCylAxis}</Descriptions.Item>
                    <Descriptions.Item label="Resi Sph">{result.input.resiSph}</Descriptions.Item>
                    <Descriptions.Item label="Resi Cyl">{result.input.resiCyl}</Descriptions.Item>
                    <Descriptions.Item label="Resi Cyl Axis">{result.input.resiCylAxis}</Descriptions.Item>
                    <Descriptions.Item label="SIA D">{result.input.siaD}</Descriptions.Item>
                    <Descriptions.Item label="SIA Axis">{result.input.siaAxis}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'LABEL_OUTPUT' })}>
                    <Descriptions.Item label={result.output.type}>{result.output.antiClockwise}</Descriptions.Item>
                    <Descriptions.Item label="Esti Cyl">{result.output.estiSph}</Descriptions.Item>
                    <Descriptions.Item label="Esti Cyl">{result.output.estiCyl}</Descriptions.Item>
                    <Descriptions.Item label="Esti Cyl Axis">{result.output.estiCylAxis}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}