'use client';

import PageHeading from '@/components/ui/tree/PageHeading';
import CreateOrnamentPage from './CreateOrnamentPage';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-light-blue">
      <PageHeading />
      <CreateOrnamentPage />
    </div>
  );
}
