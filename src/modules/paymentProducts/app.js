import { Icon } from "antd";
import { remove } from "components/alert";
import Bars from "components/bars";
import Master from "components/master";
import Pagination from "components/pagination";
import Table from "components/table";
import React from "react";
import { connect } from "react-redux";
import entry from "utils/entry";
import http from "utils/http";
import { addOrEdit } from "./dialog";
import Filter from "./filter";

const Page = connect(state => ({ browser: state.browser, bars: state.bars }))(
    class Page extends React.Component {
        state = {
            selectedIds: [],
            currentPage: 1,
            pageSize: 10,
            loading: false,

            tableData: null,
            total: 0
        };
        params = {
            checkTypeName: null
        };
        fetch() {
            const { currentPage, pageSize } = this.state;
            this.setState({ loading: true }, () => {
                http.post("/payments/getCheckTypeList", this.params, { params: { currentPage, pageSize } })
                    .then(data => {
                        this.setState({
                            loading: false,
                            tableData: data.result,
                            total: data.total
                        });
                    });
            });
        }
        componentDidMount() {
            this.fetch();
        }
        handleFilter = params => {
            this.params = params;
            this.fetch();
        };
        handlePageChange = currentPage => {
            this.setState({ currentPage }, () => {
                this.fetch();
            });
        };
        handleAdd = e => {
            e.preventDefault();
            addOrEdit().then(this.fetch);
        };
        handleEdit = (data, e) => {
            e.preventDefault();
            addOrEdit(data).then(this.fetch);
        };
        handleRowSelect = selectedIds => {
            this.setState({ selectedIds });
        };
        handleDelete = (ids, e) => {
            e.preventDefault();
            if (ids && ids.length > 0)
                remove()
                    .then(() => {
                        http.get("/payments/deleteCheckType", { params: { ids: ids.join(",") } })
                            .then(() => {
                                let { total, currentPage, pageSize } = this.state;
                                currentPage = Math.min(currentPage, Math.ceil((total - 1) / pageSize));
                                this.setState({ currentPage }, () => {
                                    this.fetch();
                                });
                            })
                    })
        };
        render() {
            const { browser, bars } = this.props;
            const { currentPage, pageSize, tableData, total, selectedIds, loading } = this.state;
            return (
                <Master activePage="paymentProducts" activeSubmenu="payment">
                    <Bars
                        left={
                            <React.Fragment>
                                <a onClick={this.handleAdd}><Icon type="plus" />新增</a>
                                <a onClick={e => this.handleDelete(this.state.selectedIds, e)}><Icon type="delete" />删除</a>
                            </React.Fragment>
                        }>
                        <Filter onFilter={this.handleFilter} />
                    </Bars>
                    <Table
                        style={{ height: browser.height - bars.height - 100 }}
                        scroll={{
                            y: browser.height - bars.height - 155,
                            x: browser.width - 200
                        }}
                        columns={[
                            {
                                title: "收费项目名称",
                                dataIndex: "checkTypeName",
                                width: 150
                            },
                            {
                                title: "单位",
                                dataIndex: "unit",
                                width: 100
                            },
                            {
                                title: "金额",
                                dataIndex: "amount",
                                width: 200
                            },
                            {
                                title: "操作",
                                className: "actions",
                                dataIndex: "id",
                                width: 100,
                                render: (id, row) => <React.Fragment>
                                    <a onClick={e => this.handleEdit(row, e)}>修改</a>
                                    <a onClick={e => this.handleDelete([id], e)}>删除</a>
                                </React.Fragment>
                            }
                        ]}
                        rowSelection={{
                            selectedRowKeys: selectedIds,
                            onChange: this.handleRowSelect
                        }}
                        rowKey="id"
                        dataSource={tableData}
                        loading={loading}
                    />
                    <Pagination
                        pageNo={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onPageChange={this.handlePageChange}
                    />
                </Master>
            );
        }
    }
)

entry(<Page />);