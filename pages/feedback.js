import useSWR from 'swr';

import PaidPlanEmpty from '@/components/PaidPlanEmpty';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardPage from '@/components/DashboardPage';
import FeedbackTable from '@/components/FeedbackTable';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import SiteTableHeader from '@/components/SiteTableHeader';

const MyFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardPage>
        <SiteTableHeader breadcrumb='feedback' title='My Feedback' />
        <SiteTableSkeleton />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      <SiteTableHeader breadcrumb='feedback' title='My Feedback' />
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <PaidPlanEmpty />
      )}
    </DashboardPage>
  );
};

export default MyFeedback;
