interface Props {
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function Toggle({ options, selectedValue, onChange }: Props) {
  return (
    <div className='inline-flex p-1 space-x-1 rounded-full'>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-5 py-2 text-sm font-semibold transition-colors duration-300 shadow ${selectedValue === option
            ? 'bg-blue-400 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-300'
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
