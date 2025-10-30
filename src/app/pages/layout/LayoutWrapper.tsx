import Layout from "./Layout";

const LayoutWrapper: React.FC = ({children})  => {   
    return (
        <Layout>
            {children}
        </Layout>
    );
};

export default LayoutWrapper;