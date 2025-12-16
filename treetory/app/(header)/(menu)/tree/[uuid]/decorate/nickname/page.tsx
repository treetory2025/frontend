'use client';

import Header from '@/components/ui/decorate/nickname/Header';
import NicknameRegisterPage from './NicknameRegisterPage';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-light-blue">
      <Header title="장식하기" />
      <NicknameRegisterPage />
    </div>
  );
}
