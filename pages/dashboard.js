import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import PaidPlanEmpty from '@/components/PaidPlanEmpty';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import DashboardPage from '@/components/DashboardPage';
import fetcher from '@/utils/fetcher';
import SiteTableHeader from '@/components/SiteTableHeader';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardPage>
        <SiteTableHeader breadcrumb='sites' title='My Sites' />
        <SiteTableSkeleton />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      <SiteTableHeader breadcrumb='sites' title='My Sites' />
      {data.sites.length ? <SiteTable sites={data.sites} /> : <PaidPlanEmpty />}
    </DashboardPage>
  );
};

export default Dashboard;
