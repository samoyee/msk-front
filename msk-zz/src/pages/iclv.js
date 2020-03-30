import React, { useState } from 'react';
import Tip from 'components/Tip';
import { Input, Descriptions } from 'antd';
import Form from 'components/Form';
import Result from 'components/Result';
import { iclv } from 'api';
import { useIntl } from 'react-intl';

export default function ICLV() {
    const intl = useIntl();
    const [result, setResult] = useState({ visible: false, output: null, input: null, error: null });

    function calculate(values) {
        iclv(values)
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
        <Tip method="ICLV" />
        <div className="calculate-wrapper">
            <Form onFinish={calculate}>
                <Form.Item label="Icl Diameter" name="iclDiameter" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Htov" name="htov" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Lt" name="lt" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Stsh" name="stsh" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item label="Stsv" name="stsv" rules={[{ required: true }]}>
                    <Input autoComplete="off" />
                </Form.Item>
            </Form>
        </div>
        <Result visible={result.visible} onClose={close}>
            {result.input &&
                <Descriptions column={2} title={intl.formatMessage({ id: 'INPUT' })}>
                    <Descriptions.Item label="Icl Diameter">{result.input.iclDiameter}</Descriptions.Item>
                    <Descriptions.Item label="Htov">{result.input.htov}</Descriptions.Item>
                    <Descriptions.Item label="Lt">{result.input.lt}</Descriptions.Item>
                    <Descriptions.Item label="Stsh">{result.input.stsh}</Descriptions.Item>
                    <Descriptions.Item label="Stsv">{result.input.stsv}</Descriptions.Item>
                </Descriptions>}
            <div className="divider"></div>
            {result.output &&
                <Descriptions column={1} title={intl.formatMessage({ id: 'OUTPUT' })}>
                    <Descriptions.Item label="Esti Vault">{result.output.estiVault}</Descriptions.Item>
                </Descriptions>}
        </Result>
    </React.Fragment>
}