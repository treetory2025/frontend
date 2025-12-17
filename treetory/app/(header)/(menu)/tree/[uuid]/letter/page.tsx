import LetterEditor from './LetterEditor'
import Header from '@/components/ui/decorate/nickname/Header';

interface Props {
  params: { uuid: string } | Promise<{ uuid: string }>
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params
  const uuid = resolvedParams.uuid

  return (
    <div className="flex flex-col h-screen bg-light-blue">
      <Header title="장식하기" />
      <LetterEditor uuid={uuid} searchParams={searchParams} />
    </div>
  )
}
