import React from "react";
import "./library.css";

const Library = () => {
  const books = [
    {
      title: "Solution to Overthinking",
      author: "Jon Acuff",
      description: "A comprehensive guide to deep learning concepts.",
      link: "https://www.google.co.in/books/edition/Soundtracks/YV4fEAAAQBAJ?hl=en&gbpv=1&dq=Overthinker&printsec=frontcover",
    },
    {
      title: "Set Boundaries, Find Peace",
      author: "Nedra Glover",
      description: "One of the best books for learning AI.",
      link: "https://www.scribd.com/document/706490488/Set-Boundaries-Find-Peace-Set-Boundaries-Find-Peace-by-Nedra-Glover-Tawwab-pdfread-net",
    },
    {
        title: "Set Boundaries, Find Peace",
        author: "Nedra Glover",
        description: "One of the best books for learning AI.",
        link: "https://www.scribd.com/document/706490488/Set-Boundaries-Find-Peace-Set-Boundaries-Find-Peace-by-Nedra-Glover-Tawwab-pdfread-net",
      },
  ];

  const articles = [
    {
      title: "Attention Is All You Need",
      author: "Ashish Vaswani et al.",
      description: "Introduction to the Transformer model for NLP.",
      link: "https://arxiv.org/abs/1706.03762",
    },
    {
      title: "ESP-NOW: Low Power Wireless Protocol",
      author: "Espressif Systems",
      description: "Research on ESP-NOW for IoT communication.",
      link: "https://www.espressif.com/sites/default/files/documentation/esp-now_user_guide_en.pdf",
    },
  ];
  return (
    <div className="library-container">
      <h1 className="heading">Library Reference</h1>
      <div className="library-content">
        <section className="reference-section">
          <h2 className="sub-heading">Books</h2>
          <ul className="reference-list">
            {books.map((book, index) => (
              <li key={index} className="reference-item">
                <strong>{book.title}</strong> - {book.author}
                <p>{book.description}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </li>
            ))}
          </ul>
        </section>
  
        <section className="reference-section">
          <h2 className="sub-heading">Articles</h2>
          <ul className="reference-list">
            {articles.map((article, index) => (
              <li key={index} className="reference-item">
                <strong>{article.title}</strong> - {article.author}
                <p>{article.description}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );  
};

export default Library;