
export default function Introduction() {
  return (
    <section className="flex flex-col justify-between text-white mobile:text-center absolute top-[15%] left-0 right-0 bottom-0">
      <div className="bg-[linear-gradient(to_bottom,transparent_0%,rgba(17,24,39,0.2)_15%,rgba(17,24,39,0.2)_85%,transparent_100%)] py-8">
        <h2 className="text-2xl text-center desktop:text-4xl">리부트 배드민턴 센터</h2>
        <hr className="w-8 desktop:w-1/3 h-1 my-4 desktop:my-8 mx-auto bg-white" />
        <span className="block text-center desktop:text-xl">남양주 최고의 배드민턴 레슨 시설</span>
        <span className="block text-center desktop:text-xl">드라마촬영/연예인/인플루언서들의 집합소</span>
      </div>
    </section>
  );
}
