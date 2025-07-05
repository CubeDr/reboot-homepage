import LocationDetails, { DistanceInfo } from './LocationDetails';

const distanceInfo: DistanceInfo[] = [
  {
    transport: '지하철',
    number: '4호선',
    value: '오남역, 별내별가람역, 진접역',
  },
  {
    transport: '버스',
    number: '떙큐70, 100, 9, 23, 202, 9-1, 10',
    value: '독정리 하차',
  },
  {
    transport: '차량',
    number: '승용차, 택시',
    value: '진건오남로390번길 89',
  },
];

function Location() {
  return (
    <div className="px-12 mb-12">
      <h1 className="ml-1 mt-12 mb-4 text-gray-800 text-xl font-bold flex items-center gap-3">
        <div className="w-1 h-8 bg-blue-300"></div> 오시는 길
      </h1>
      <LocationDetails
        name="리부트 배드민턴 전용구장"
        address="경기 남양주시 진건읍 진건오남로390번길 89 1층"
        tel="0507-1386-3720"
        phone="010-3105-6212"
        distanceInfo={distanceInfo} />
    </div>
  );
}

export default Location;
