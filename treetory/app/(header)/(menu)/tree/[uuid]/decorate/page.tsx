'use client';

import { useState } from 'react';
import PageHeading from '@/components/commons/PageHeading';
import DecoratePage from './DecoratePage';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-light-blue">
      <PageHeading title="장식하기"/>
      <DecoratePage />
    </div>
  );
}
