import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import Feed from '../components/Feed';

const GalleryTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Gallery - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Gallery">
        Looks like we've got a gallery here, holmes.
      </Page>
    </Layout>
  );
};

export default GalleryTemplate;