import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import PaidPlanEmpty from '@/components/PaidPlanEmpty';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import DashboardPage from '@/components/DashboardPage';
import fetcher from '@/utils/fetcher';

const Dashboard = () => {
  const auth = useAuth();
  const { data } = useSWR('/api/sites', fetcher);

  if (!data) {
    return (
      <DashboardPage>
        <SiteTableSkeleton />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      {data.sites ? <SiteTable sites={data.sites} /> : <PaidPlanEmpty />}
    </DashboardPage>
  );
};

export default Dashboard;
