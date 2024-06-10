export default function Input({
  name,
  type,
  placeholder,
  value,
  style,
  onClick,
  onChange,
}) {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        style={style}
        onClick={onClick}
        onChange={onChange}
        className=" font-[Poppins] lg:w-[20rem] w-full lg:text-base
         md:text-3xl border border-slate-600 
         lg:p-2 md:p-4 p-2 mt-1 rounded-md 
         "
      />
    </>
  );
}

export const Title = ({ TitleValue }) => {
  return (
    <>
      <h6 className=" font-[Poppins] lg:text-xl md:text-2xl text-xl font-bold flex justify-start ml-2 pb-1 ">
        {TitleValue}
      </h6>
    </>
  );
};

export const SubTitle = ({ SubTitleValue }) => {
  return (
    <>
      <p className=" font-[Poppins] text-lg flex justify-start ml-2 text-slate-600 ">
        {SubTitleValue}
      </p>
    </>
  );
};
export const Labels = ({ Label }) => {
  return (
    <>
      <label
        className=" font-[Poppins] text-xl flex pt-2 
      justify-start ml-5 text-slate-600 
      "
      >
        {Label}
      </label>
    </>
  );
};
