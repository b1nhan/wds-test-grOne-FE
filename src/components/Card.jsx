let Card = ({ title, price, image }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[200px] w-[250px] bg-black">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        ></img>
      </div>
      <div className="mt-2 w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>
      <b>{price.toLocaleString('vi-VN') + 'đ'}</b>
    </div>
  );
};

export default Card;

