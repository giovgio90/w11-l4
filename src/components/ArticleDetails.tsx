import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArticleApi } from "../interfaces/Article";
import { Container, Card, Button } from "react-bootstrap";

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleApi | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);

        if (!response.ok) {
          throw new Error("Errore nella richiesta API");
        }

        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Errore nella richiesta API", error);
      }
    };

    fetchData();
  }, [id]);

  if (!article) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <Container>
      <h1 className="text-center">Article details</h1>
      <Card>
        <Card.Body>
          <Card.Title className="display-4 ">{article.title}</Card.Title>
          <Card.Text className="mb-5">
            <span className="fw-bold">Data di pubblicazione:</span> {article.updated_at}
          </Card.Text>
          <Card.Text>{article.summary}</Card.Text>
          <Card.Text className="fw-bold">{article.news_site}</Card.Text>

          <Link to="/">
            <Button variant="dark">Back to Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ArticleDetails;
