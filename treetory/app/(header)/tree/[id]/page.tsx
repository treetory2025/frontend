export default function Page({ params }: { params: { id: string } }) {
  return <div>Tree {params.id} Page</div>;
}
