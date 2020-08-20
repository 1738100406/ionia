import { Layout, Menu } from "antd";
import React from "react";
import Header from "./components/Header";
import "./index.less";

const { Sider, Content } = Layout;

const BasicLayout: React.FC = ({ children }) => {
  return (
    <Layout className="io-layout">
      <Header />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
