interface CardProps {
    image: string;
    name: string;
    type: string;
}

const Card: React.FC<CardProps> = ({image, name, type}) => {
  return (
    <div className="border-2 border-slate-300 w-60 flex flex-col items-start justify-center py-4 px-8 rounded-lg hover:scale-105 duration-300 bg-slate-100 shadow-lg">
      <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden mb-4">
        <img
          className="object-cover w-full h-full"
          src={image}
          alt="user image"
        />
      </div>
      <div>Name : {name}</div>
      <div>Type : {type}</div>
    </div>
  );
};

export default Card;
