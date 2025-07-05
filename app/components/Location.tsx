'use client'

import Toggle from '@/components/Toggle';
import { useState } from 'react';
import LocationDetails from './LocationDetails';

const locations: { [key: string]: any } = {
  '별내점': {
    name: '리부트 배드민턴 센터&샵 별내점',
    address: '경기 남양주시 별내면 청학로54번길 55-30 1동',
    tel: '0507-1386-3720',
    phone: '010-3105-6212',
    coords: { lat: 37.71095, lng: 127.12465 },
    distanceInfo: [
      {
        transport: '지하철',
        number: '4호선, 의정부경전철',
        value: '별내별가람역, 탑석역',
      },
      {
        transport: '버스',
        number: '11-1, 1-1, 8-8A, 8-8B, 10-5, 155, 땡큐30, 땡큐50, 33-1',
        value: '용암리입구, 청학주공아파트 하차',
      },
      {
        transport: '차량',
        number: '승용차, 택시',
        value: '청학로54번길',
      },
    ],
  },
  '진건점': {
    name: '리부트 배드민턴 센터 진건점',
    address: '경기 남양주시 진건읍 진건오남로390번길 89',
    tel: '0507-1386-3720',
    phone: '010-3105-6212',
    coords: { lat: 37.6689999, lng: 127.2084842 },
    distanceInfo: [
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
    ],
  },
};

function Location() {
  const [selectedKey, setSelectedKey] = useState('별내점');

  return (
    <div className="px-12 mb-12">
      <h1 className="ml-1 mt-12 mb-4 text-gray-800 text-xl font-bold flex items-center gap-3">
        <div className="w-1 h-8 bg-blue-300"></div> 오시는 길
      </h1>
      <Toggle
        options={Object.keys(locations)}
        selectedValue={selectedKey}
        onChange={setSelectedKey} />
      <div className="h-2" />
      <LocationDetails
        name={locations[selectedKey].name}
        address={locations[selectedKey].address}
        tel={locations[selectedKey].tel}
        phone={locations[selectedKey].phone}
        distanceInfo={locations[selectedKey].distanceInfo}
        coords={locations[selectedKey].coords} />
    </div>
  );
}

export default Location;
