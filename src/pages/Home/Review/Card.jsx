const Card = ({ one }) => {
  const { userName, user_photoURL, review: comment, ratings, date } = one;

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 hover:shadow-xl transition duration-300 w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={user_photoURL}
          alt={userName}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
        />
        <div>
          <h3 className="font-semibold text-sm sm:text-lg">{userName}</h3>
          <p className="text-[10px] sm:text-xs text-gray-400">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm leading-relaxed">
        "{comment}"
      </p>
      <div className="mt-3 sm:mt-4 flex items-center justify-between">
        <div className="text-yellow-500 text-sm sm:text-lg">
          {"⭐".repeat(Math.floor(ratings))}
          <span className="text-gray-400 text-[10px] sm:text-sm ml-2">
            ({ratings})
          </span>
        </div>
        <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          Verified
        </span>
      </div>
    </div>
  );
};

export default Card;