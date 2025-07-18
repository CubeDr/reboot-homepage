import NaverMap, { Coords } from './NaverMap';

export interface DistanceInfo {
  transport: string;
  number: string;
  value: string;
}

interface Props {
  name: string;
  address: string;
  tel: string;
  phone: string;
  distanceInfo: DistanceInfo[];
  coords: Coords;
}

export default function LocationDetails({ name, address, tel, phone, distanceInfo, coords }: Props) {
  return (
    <div className="flex flex-row mobile:flex-col items-start mobile:justify-center gap-6">
      <div className="w-full h-100 mobile:h-auto">
        <NaverMap {...coords} />
      </div>
      <div className="w-full text-gray-700 leading-relaxed space-y-4">
        <div className="mb-8">
          <h2 className="flex items-center gap-3 text-xl font-semibold mb-3 whitespace-nowrap">
            {name}
          </h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-[72px] mr-3 flex flex-row flex-nowrap justify-between items-center *:font-bold *:text-nowrap">
                <div>주</div>
                <div>소 :</div>
              </div>
              <span>{address}</span>
            </div>
            <div className="flex items-center">
              <div className="w-[72px] mr-3 flex flex-row flex-nowrap justify-between items-center *:font-bold *:text-nowrap">
                <div>T</div>
                <div>E</div>
                <div>L :</div>
              </div>
              <span>{tel}</span>
            </div>
            <div className="flex items-center">
              <div className="w-[72px] mr-3 flex flex-row flex-nowrap justify-between items-center *:font-bold *:text-nowrap">
                <div>P</div>
                <div>h</div>
                <div>o</div>
                <div>n</div>
                <div>e :</div>
              </div>
              <span>{phone}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">이동수단별 안내</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="*:text-center">
                  <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    종류
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    호선
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                    도착 위치
                  </th>
                </tr>
              </thead>
              <tbody>
                {distanceInfo.map((info, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-4 py-2 text-center border-b border-gray-200 text-sm text-gray-700 whitespace-nowrap">
                      {info.transport}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {info.number}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {info.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
