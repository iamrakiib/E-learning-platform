import React from 'react';
import Image from 'next/image';

type Props = {
  quote: string;
  author: {
    name: string;
    title: string;
    avatarUrl: string;
  };
};

export default function TestimonialCard({ quote, author }: Props) {
  const isImageUrl = author.avatarUrl.startsWith('http');
  
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote-icon">"</div>
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-author">
        {isImageUrl ? (
          <div className="testimonial-avatar">
            <Image
              src={author.avatarUrl}
              alt={author.name}
              width={56}
              height={56}
              className="testimonial-avatar-img"
              unoptimized
            />
          </div>
        ) : (
          <div className="testimonial-avatar-placeholder">
            {author.avatarUrl}
          </div>
        )}
        <div className="testimonial-author-info">
          <h4>{author.name}</h4>
          <p>{author.title}</p>
        </div>
      </div>
    </div>
  );
}
