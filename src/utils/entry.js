import {
    ConfigProvider
} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import "lib/browser";
import React from "react";
import {
    render
} from "react-dom";
import {
    Provider
} from "react-redux";
import store from "store";

import "moment/locale/zh-cn";
import moment from "moment";
moment.locale("zh-cn");

export default function entry(ReactNode, container) {
    render(
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <React.Fragment>
                    {ReactNode}
                </React.Fragment>
            </ConfigProvider>
        </Provider>,
        container || document.getElementById("app")
    );
}