import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import { TableDataGrid } from "../components/Table/Own/TableDataGrid";

// const Page: NextPageWithLayout = () => <p>hello world</p>;

// Page.getLayout = function getLayout(_page: ReactElement) {
//   return (
//     <Layout>
//       <>
//         <>Booker</>
//         <App />
//       </>
//     </Layout>
//   );
// };

// export default Page;

export default function Bookings() {
  return <TableDataGrid />;
}

// export async function getServerSideProps() {
//   return { props: {} };
// }
