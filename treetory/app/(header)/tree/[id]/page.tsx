export default function Page({ params }: { params: { id: string } }) {
  // test용 console log

  console.log(params);
  return <div>Tree {params.id} Page</div>;
}
