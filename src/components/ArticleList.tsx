import { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticleApi } from "../interfaces/Article";

const ArticleList = () => {
  const [articles, setArticles] = useState<ArticleApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles");

        if (!response.ok) {
          throw new Error("Errore nella richiesta API");
        }

        const data = await response.json();
        console.log("Dati API:", data);
        setArticles(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Errore nella richiesta API", error);
        setError("Si è verificato un errore durante il recupero dei dati.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center display-5 mt-5">Caricamento in corso...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-5">
      <div style={{ borderRadius: "10px", border: "1px solid black" }}>
        {articles.map((article) => (
          <Nav.Item key={article.id}>
            <Nav.Link as={Link} to={`/article/${article.id}`} className="nav-link py-3 px-2 fs-5 fw-bolder">
              {article.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </div>
    </Container>
  );
};

export default ArticleList;
