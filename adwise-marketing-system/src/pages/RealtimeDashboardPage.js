/**
 * RealtimeDashboardPage
 * Page component for real-time dashboard with WebSocket updates
 */
import React from 'react';
import Layout from '../components/Layout';
import RealtimeDashboard from '../components/RealtimeDashboard';

const RealtimeDashboardPage = () => {
  return (
    <Layout>
      <div className="p-6">
        <RealtimeDashboard />
      </div>
    </Layout>
  );
};

export default RealtimeDashboardPage;
