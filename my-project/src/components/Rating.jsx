import React from 'react';

function Rating({ rating, votes }) {
  // Функція для визначення правильної форми слова "голос"
  const getVotesText = (votes) => {
    if (votes % 10 === 1 && votes % 100 !== 11) {
      return `${votes} голос`;
    } else if (votes % 10 >= 2 && votes % 10 <= 4 && (votes % 100 < 10 || votes % 100 >= 20)) {
      return `${votes} голоси`;
    } else {
      return `${votes} голосів`;
    }
  };

  // Створюємо масив з 5 зірочок, де кожна зірочка може бути порожньою або заповненою
  const stars = Array(5).fill(false).map((_, index) => index < rating);

  return (
    <div>
      <div>
        {stars.map((star, index) => (
          <span key={index} style={{ color: star ? '#ffcc00' : '#ccc' }}>★</span>
        ))}
      </div>
      <p>({getVotesText(votes)})</p>
    </div>
  );
}

export default Rating;
