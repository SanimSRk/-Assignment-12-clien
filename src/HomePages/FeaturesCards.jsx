const FeaturesCards = ({ item }) => {
  const { image, title, description } = item;
  return (
    <div className="shadow-lg rounded-lg p-6 mt-8 grid items-end">
      <img src={image} alt="" />
      <h2 className="text-xl font-bold mt-3 text-green-500">{title}</h2>
      <p className="mt-4">{description}</p>
    </div>
  );
};

export default FeaturesCards;
