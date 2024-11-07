const IconNavBar = () => {
  return (
    <div className="text-3xl text-slate-700 font-bold cursor-pointer" onClick={() => window.location.href = '/'}>
      <p>
        Data<span className="font-bold text-green-500">Tech</span>
      </p>
    </div>
  );
};

export default IconNavBar;
